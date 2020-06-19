'use strict';

const Controller = require('egg').Controller

const { ServerRes, ServerError } = require('../../tools/res')

class PdfCreateController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  index() {
    const { ctx, config } = this

    ctx.validate({
      url: { type: 'string' }
    });

    let { url } = ctx.request.body

    try {
      ctx.app.writerNsq.publish(config.nsq.topic, {
       url
      })

      ctx.service.log.send({
        msg: 'api/pdf, request in',
        data: {
          url,
          refer: ctx.request.header.referer || 'unknown',
          ua: ctx.request.header['user-agent'] || ''
        },
      })

      ctx.body = new ServerRes()

    } catch(e) {

      console.error(e)
      ctx.body = new ServerError(e)
    }
  }
}

module.exports = PdfCreateController;
