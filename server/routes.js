// All the Server side routes live in this one file!

const controllers = require('./controllers.js');
const Certification = require('./controllers/certification.controllers.js');
const Person = require('./controllers/person.controllers.js');

const logRequest = (req, res, next) => {
  console.log('protect api user:', req.user)
  next()
}

module.exports = function(app) {

  app.get('/helloworld', controllers.helloWorld);

  // Authentication
  app.post('/signup', Person.signUp)
  app.post('/login', Person.login)

  // Middleware to check JWT on all api transactions
  app.use('/api', Person.protect);

  // TEMP - Logs the user (person) attached to request upon successful JWT check
  // app.use('/api', logRequest);

  // Certification Routes
  app.post('/api/certification', Certification.create)
  app.get('/api/certification', Certification.get)
  app.get('/api/certification/:id', Certification.show)
  app.put('/api/certification/:id', Certification.update)
  app.delete('/api/certification/:id', Certification.remove)

  // Person Routes
  app.get('/api/person', Person.get);
  app.post('/api/person', Person.create);
  app.get('/api/person/:id', Person.show);
  app.put('/api/person/:id', Person.update);
  app.delete('/api/person/:id', Person.remove);
  app.post('/api/person/:id/certification', Person.addCertificationAndSignature);
  app.put('/api/person/:id/certification/:certification_id', Person.updateCertifcation);
};
