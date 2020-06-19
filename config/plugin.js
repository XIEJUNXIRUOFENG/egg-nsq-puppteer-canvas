'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: false,
    package: 'egg-redis'
  },
  oss: {
    enable: true,
    package: 'egg-oss'
  }
}
