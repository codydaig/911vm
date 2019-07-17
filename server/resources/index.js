const Neode = require('neode');
const Person = require('./person/person.model');
const Test = require('./test/test.model');

const neode = new Neode.fromEnv().with({
  Person: Person,
  Test: Test
});

module.exports = neode;