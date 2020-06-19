let Error = {
  ERROR_SUCCESS: 1000,
  ERROR_UPLOAD_FIAL: 10001
}
exports.Error = Error

exports.msgMap = {
  [Error.ERROR_SUCCESS]: '成功',
  [Error.ERROR_UPLOAD_FIAL]: '上传文件失败'
}
