// All the Server side routes live in this one file!

const controllers = require('./controllers.js');
const Certification = require('./controllers/certification.controllers.js/index.js');
const Person = require('./controllers/person.controllers.js/index.js');

module.exports = function(app) {

  app.get('/helloworld', controllers.helloWorld);

  // Certification Routes
  app.post('/api/certification', Certification.create)
  app.get('/api/certification', Certification.get)

  // Person Routes
  app.get('/api/person', Person.get);
  app.post('/api/person', Person.create);
  app.get('/api/person/:id', Person.show);
  app.put('/api/person/:id', Person.update);
  app.delete('/api/person/:id', Person.remove);
  app.post('/api/person/:id/certification', Person.addCertification);
  app.get('/api/person/:id/certification', Person.getCertifications);



};
