const Service = require('egg').Service;
const Axios = require('axios')
const os = require('os')

class RemoteLogService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  send(params) {
    if (this.config.env === 'prod') {
      Axios.get(this.config.log.baseUrl, {
        params: {
          APIVersion: '0.6.0',
          hostname: os.hostname,
          ...params,
        }
      })
    } else {
      console.log(JSON.stringify(params))
    }
  }
}

module.exports = RemoteLogService