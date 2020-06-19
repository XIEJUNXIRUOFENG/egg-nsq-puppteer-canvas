module.exports = {
  // cdn地址
  cdn: {
    domain: '',
    folder: ''
  },
  nsq: {
    topic: 'pdf_topic',
    channel: 'pdf_channel',
    // 这里是你的nsq配置
    nsqHostReader: '',
    nsqHostWriter: '',
    writePort: 4150
  },
  // 完成之后通知服务端的接口
  pdfNotify: '',
  // 
  article: '',
  oss:{
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      endpoint: '',
      timeout: '',
    }
  }
}
