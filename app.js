'use strict';
 
const nsq = require('nsqjs')

const axios = require('axios')
 
module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();

    const writerNsq = new nsq.Writer(app.config.nsq.nsqHostWriter, app.config.nsq.writePort)

    writerNsq.connect()

    writerNsq.on('ready', () => {
      app.writerNsq = writerNsq
    })
 
    const client = new nsq.Reader(app.config.nsq.topic, app.config.nsq.channel, { 
      lookupdHTTPAddresses: app.config.nsq.nsqHostReader,
      maxInFlight: 1
    })

    client.connect()
 
    client.on('message', async msg => {
      let { url } = JSON.parse(msg.body.toString())
      const pdfLoseNotify = async() => {
        await axios.post(app.config.pdfNotify, {
          url
        })
      }
      try {
        const touch = () => {
          if (!msg.hasResponded) {
            msg.touch()

            // Touch the message again a second before the next timeout.
            setTimeout(touch, msg.timeUntilTimeout() - 1000)
          }
        }

        let timeTouch =  setTimeout(touch, msg.timeUntilTimeout() - 1000)

        let timeFinish = setTimeout(msg.finish.bind(msg), msg.timeUntilTimeout() * 3 + 1000)

        let url = await ctx.service.pdf.index.generate(url)

        clearTimeout(timeTouch)
        clearTimeout(timeFinish)
        
        msg.finish()

        const pdfNotify = async(status) => {
          let data = await axios.post(app.config.pdfNotify, {
            url
          })

          if (data.data && data.data.code === 1000 && status) {
            return
          } else {
            if (status) {
              await pdfNotify(false)
            } else {
              await pdfLoseNotify()
            }
          }
        }

        await pdfNotify(true)

      } catch (error) {
        msg.finish()
        await pdfLoseNotify()
        ctx.service.log.send({
          msg: 'api/pdf, msg work error',
          data: {
            url,
            error
          },
        })
      }
    });
 
    client.on('error', function(err) {
      ctx.service.log.send({
        msg: 'api/pdf, msg client error',
        data: {
          err
        },
      })
    });
  });
};
