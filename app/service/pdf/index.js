const Service = require('egg').Service

class PDFService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  async generate(url) {

    return new Promise(async (resolve, reject) => {
      let file = await this.service.pdf.pdfProduce.htmlToImg(url)
      try {
        let timeBeforeUpload = new Date().getTime()

        let timeTitle = `${title}-${new Date().getTime()}`

        let uploadedFile = await this.service.cdn.uploadFile(file, timeTitle)
        this.service.log.send({
          msg: 'api/pdf, upload files success, time for upload pdf',
          data: {
            timeTitle,
            uploadedFile,
            time: new Date().getTime() - timeBeforeUpload
          }
        })

        let pdfUrl = `https://${this.config.cdn.domain}/${uploadedFile}`

        resolve(pdfUrl)

      } catch(e) {
        this.service.log.send({
          msg: 'api/pdf, upload file error',
          data: {
            url,
            e
          }
        })
        reject(e);
      }
    })
  }
}

module.exports = PDFService;