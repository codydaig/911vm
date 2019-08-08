const Neode = require('neode');
const Person = require('./person.schema');
const Certification = require('./certification.schema');
const Signature = require('./signature.schema');

const neode = new Neode.fromEnv().with({
  Person: Person,
  Certification: Certification,
  Signature: Signature,
});

neode.cypher('CREATE CONSTRAINT ON (p:Person) ASSERT p.email_address IS UNIQUE');
neode.cypher('CREATE CONSTRAINT ON (c:Certification) ASSERT c.name IS UNIQUE');

module.exports = neode;