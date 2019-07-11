const neode = require('neode');
const Person = require('./person/person.model');

neode
    .fromEnv()
    .with({
        Person: Person
    });

module.exports = neode;