const Service = require('egg').Service;
const { Error } = require('../tools/error');

class CDNService extends Service {
  constructor(ctx) {
    super(ctx)
  }
  uploadFile(file, title) {
    return new Promise(async (resolve, reject) => {
      try {
        const ctx = this.ctx
        let key = `${this.config.cdn.folder}/${title}.${file.ext}`;
        let respBody = await ctx.oss.put(key, file.buffer)
        if (respBody.res && respBody.res.statusCode === 200) {
          resolve(respBody.name)
        } else {
          reject(null, respBody);
        }
      } catch (error){
        this.service.log.send({
          msg: 'api/pdf, upload service error',
          data: {
            error
          }
        })
        reject( null, error)
      }
    });
  }

  async uploadFiles(files, title) {
    let res
    try {
      res = await Promise.all(
        files.map(file => this.uploadFile(file, title))
      )
    } catch (e) {
      throw Error.ERROR_UPLOAD_FIAL
    }
    return res[1]
  }
}

module.exports = CDNService