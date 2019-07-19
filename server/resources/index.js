const Neode = require('neode');
const Person = require('./person/person.model');
const Certification = require('./certification/certification.model');

const neode = new Neode.fromEnv().with({
  Person: Person,
  Certification: Certification
});

module.exports = neode;