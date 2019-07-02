// All the Server side routes live in this one file!

const controllers = require('./controllers.js');

module.exports = function(app) {

  app.get('/helloworld', controllers.helloWorld);

};
