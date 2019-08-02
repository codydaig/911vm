var db = require('../db');

var Persons = {};

Persons.getOne = function (personID) {
  return neode.first('Person', 'id', id)
  .then((person) => {
    return {
      id: person.get('id'),
      first_name: person.get('first_name'),
      last_name: person.get('last_name'),
      email_address: person.get('email_address'),
      phone_number: person.get('phone_number'),
      is_admin: person.get('is_admin'),
      is_volunteer: person.get('is_volunteer'),
      created_at: person.get('created_at'),
    }
  });
}

module.exports = Persons;