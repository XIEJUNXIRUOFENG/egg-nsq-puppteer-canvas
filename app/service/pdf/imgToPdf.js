const { createCanvas, loadImage } = require('canvas')

const { tools } = require('../../tools/index')

class imgToPdf {
  constructor(height) {
    // 创建画布大小
    this.canvas = createCanvas(tools.interceptWidth * tools.deviceScaleFactor, height, 'pdf')
    this.ctx = this.canvas.getContext('2d')
  }

  async set(bufferImage, height, index) {
    return new Promise(async (resolve, reject) => {
      try  {
        if (index) {
          this.ctx.addPage(tools.interceptWidth * tools.deviceScaleFactor, height)
        }
        await loadImage(bufferImage).then((image) => {
          this.ctx.drawImage(image, 0, 0)
        })
        resolve(true)
      } catch(e) {
        reject(e)
      }
    })
  }

  get() {
    return this.canvas.toBuffer()
  }
}

exports.imgToPdf = imgToPdf
