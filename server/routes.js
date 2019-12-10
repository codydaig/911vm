// All the Server side routes live in this one file!

const controllers = require('./controllers.js');
const Certification = require('./controllers/certification.controllers.js');
const Person = require('./controllers/person.controllers.js');

module.exports = function(app) {

  app.get('/helloworld', controllers.helloWorld);

  // Authentication
  app.post('/signup', Person.signUp)
  app.post('/login', Person.login)

  // Middleware to check JWT on all api transactions
  // app.use('/api', Person.protect);

  // Certification Routes
  app.post('/api/certification', Certification.create)
  app.get('/api/certification', Certification.get)
  app.get('/api/certification/:id', Certification.show)
  app.put('/api/certification/:id', Certification.update)
  app.delete('/api/certification/:id', Certification.remove)

  // Person Routes
  app.get('/api/person', Person.get);
  app.get('/api/person/certifications', Person.getWithCerts);
  app.post('/api/person', Person.create);
  app.post('/api/person/search', Person.search);
  app.get('/api/person/dashboard', Person.dashboard);
  app.get('/api/person/:id', Person.show);
  app.put('/api/person/:id', Person.update);
  app.delete('/api/person/:id', Person.remove);
  app.post('/api/person/:id/certification', Person.addCertificationAndSignature);
  app.put('/api/person/:id/certification/:certification_id', Person.updateCertifcation);
};
