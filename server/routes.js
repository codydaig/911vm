const controllers = require('./controllers.js');

module.exports = function(app) {

  app.get('/helloworld', controllers.helloWorld);

};