const { Error, msgMap } = require("./error")

class ServerError {
  constructor(error) {
    this.code = error
    this.msg = msgMap[error]
    if (error === 1000) {
      this.err = false
    }
  }
}

class ServerRes extends ServerError {
  constructor(data) {
    super(Error.ERROR_SUCCESS)
    if (data) {
      this.data = data
    }
  }
}

exports.ServerError = ServerError
exports.ServerRes = ServerRes