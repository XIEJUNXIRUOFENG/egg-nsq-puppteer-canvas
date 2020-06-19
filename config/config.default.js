/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571990290713_4568';

  // add your middleware config here
  config.middleware = [
    'robot'
  ];

  config.robot = {
    ua: [
      /Baiduspider/i,
    ]
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.logger = {
    level: 'INFO',
  }

  config.workerStartTimeout = 10 * 60 * 1000;

  // nsq
  config.nsq = {
    topic: 'pdf_topic',
    channel: 'pdf_channel',
    // 这里是你的nsq配置
    nsqHostReader: '',
    nsqHostWriter: '',
    writePort: 4150
  }

  // add your user config here
  const userConfig = {
    myAppName: 'egg-nsq-puppteer-canvas',
    cluster: {
      listen: {
        port: 8080,
        hostname: '0.0.0.0',
      },
    },
    log: {
      baseUrl: '',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
