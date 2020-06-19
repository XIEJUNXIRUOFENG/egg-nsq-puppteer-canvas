'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/nodeapi/pdf/create', controller.api.create.index);
  router.get('/listen', controller.healthCheck.index);
};
