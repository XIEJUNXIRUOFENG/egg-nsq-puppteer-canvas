'use strict'
const Controller = require('egg').Controller;

class HealthCheck extends Controller {
  index() {
    this.ctx.body = 'ok';
  }
}

module.exports = HealthCheck;