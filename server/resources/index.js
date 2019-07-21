const Neode = require('neode');
const Person = require('./person/person.model');
const Certification = require('./certification/certification.model');

const neode = new Neode.fromEnv().with({
  Person: Person,
  Certification: Certification
});

neode.cypher('CREATE CONSTRAINT ON (p:Person) ASSERT p.email_address IS UNIQUE');
neode.cypher('CREATE CONSTRAINT ON (c:Certification) ASSERT c.name IS UNIQUE');

module.exports = neode;