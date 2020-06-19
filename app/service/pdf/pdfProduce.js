const Service = require('egg').Service

const puppeteer = require('puppeteer')

const { tools } = require('../../tools/index')

const { imgToPdf } = require('./imgToPdf')

let browerpage

class pdfProduceService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  async scroll(page) {
    return page.evaluate(() => {
      return new Promise((resolve, reject) => {
        // 这里是对于内置浏览器环境拿不到外部定义的变量
        let distance = 4000
        //页面的高度 包含滚动高度
        let scrollHeight = document.body.scrollHeight
        //滚动条向下滚动 distance
        window.scrollBy(0, distance)
  
        let scrollTop = document.documentElement.scrollTop
  
        //当滚动的总高度 大于 页面高度 说明滚到底了。也就是说到滚动条滚到底时，以上还会继续累加，直到超过页面高度
        resolve({
          canScroll: scrollTop <= scrollHeight,
          scrollTop: scrollTop,
          screenHeight: window.screen.height,
          scrollHeight
        })
      })
    })
  }
  
  // 最后一页滚到底部
  async lastScroll(page) {
    return page.evaluate(() => {
      return new Promise((resolve, reject) => {
        //滚动条向下滚动到最底部
        window.scrollBy(0, document.body.scrollHeight)
        resolve(true)
      })
    })
  }
  
  // 页面高度是否大于一张图片高度（tools.interceptHeight）
  async moreThanOnePage(page) {
    return page.evaluate(() => {
      return new Promise((resolve, reject) => {
        if (document.body.scrollHeight >= 4000) {
          resolve(true)
        } else {
          resolve(document.body.scrollHeight)
        }
      })
    })
  }
  
  
  async sleep(time) {
    return new Promise(resolve => {
      setTimeout(_ => {
        resolve()
      }, time)
    })
  }
  
  async htmlToImg(url) {
    return new Promise(async (resolve, reject) => {
      try {
        let startTime, endPrintTime
  
        startTime = new Date()
        const brower = await puppeteer.launch({args: ['--no-sandbox', '--disable-dev-shm-usage']})
        const page = await brower.newPage()
  
        await page.setViewport({
          width: tools.interceptWidth,
          height: tools.interceptHeight,
          deviceScaleFactor: tools.deviceScaleFactor
        })
  
        await page.setUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 ios/4.10.0'
        )
        
        browerpage = page

        this.service.log.send({
          msg: 'api/pdf, puppeteer launchs',
          data: {
            launchs: true
          }
        })
  
        await browerpage.goto(url, { waitUntil: 'networkidle0' })
  
  
        const more = await this.moreThanOnePage(browerpage)

        // 判断首页是不是小于tools.interceptHeight
        let lastScrllTop = more === true ? -tools.interceptHeight : -more
        let obj = { scrollTop: 0 }
        let i = 0
  
        // 实例化一个imgToPDF,判断more是为了初始化imgToPdf画布的初始高度
        let imgToPdfHeight = more === true ? tools.interceptHeight : more
        let toPdf = new imgToPdf(imgToPdfHeight * tools.deviceScaleFactor)
  
        while(obj.scrollTop > lastScrllTop) {
          let funCanScroll = true
  
          // 最后一页的高度
          let imgToPdfGetHeight = tools.interceptHeight * tools.deviceScaleFactor
  
          //最后一小于tools.interceptHeight情况
  
          if (obj.scrollTop - lastScrllTop < tools.interceptHeight) {
            funCanScroll = false
            // 因为deviceScaleFactor设置为2所以高度要乘以2才是真实高度
            imgToPdfGetHeight = (obj.scrollTop - lastScrllTop) * tools.deviceScaleFactor
  
            await browerpage.setViewport({
              width: tools.interceptWidth,
              height: imgToPdfGetHeight / tools.deviceScaleFactor,
              deviceScaleFactor: tools.deviceScaleFactor
            })
  
            await this.lastScroll(browerpage)
          }
  
          lastScrllTop = obj.scrollTop
  
          // 便于优酷视频懒加载
          await this.sleep(1000)
  
          let buffer = await browerpage.screenshot({
            type: 'png'
          })

          try {
            await toPdf.set(buffer, imgToPdfGetHeight, i)
            buffer = null
          } catch(e) {
            this.service.log.send({
              msg: 'api/pdf, imgToPdf set error',
              data: {
                setError: true
              }
            })
          }
  
          i++
  
          obj = await this.scroll(browerpage)
  
          if (!funCanScroll) {
            break
          }
        }
  
        await brower.close()
        resolve({
          buffer: toPdf.get(),
          ext: 'pdf'
        })
      } catch(e) {
        this.service.log.send({
          msg: 'api/pdf, htmlToImg function error',
          data: {
            e
          }
        })
        reject(e)
      }
    })
  }
}

module.exports = pdfProduceService