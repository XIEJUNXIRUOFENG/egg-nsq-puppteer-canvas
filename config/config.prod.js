module.exports = {
  cdn: {
    domain: '',
    folder: ''
  },
  nsq: {
    topic: 'pdf_topic',
    channel: 'pdf_channel',
    nsqHostReader: '',
    nsqHostWriter: '',
    writePort: 4150
  },
  pdfNotify: '',
  article: '',
  oss:{
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      endpoint: '',
      timeout: '300s',
    }
  },
  logger: {
    level: 'NONE',
  }
}
