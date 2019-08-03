const neode = require('../schema/index');

let Persons = {};

Persons.getAll = () => {
  const query = 'match (p:Person) return p';
  return neode.cypher(query, {})
  .then((collection) => {    
    const resdata = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    return resdata;
  }) 
}

Persons.findOneById = (id) => {
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
  })
}

Persons.addOne = (data) => {
  return neode.create('Person', data)
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
  })
}

Persons.findOneByIdAndUpdate = (id, data) => {
  return neode.first('Person', 'id', id)
  .then((person) => {
    return person.update(data);
  })
  .then((updated) => {
    return {
      id: updated.get('id'),
      first_name: updated.get('first_name'),
      last_name: updated.get('last_name'),
      email_address: updated.get('email_address'),
      phone_number: updated.get('phone_number'),
      is_admin: updated.get('is_admin'),
      is_volunteer: updated.get('is_volunteer'),
      created_at: updated.get('created_at'),
    }
  })
}

Persons.findOneByIdAndDelete = (id) => {
  return neode.first('Person', 'id', id)
  .then((person) => {
    return person.delete();
  })
  .then(() => {
    return `Successfully deleted ${id}`
  }) 
}

Persons.findOneByIdAndAddCertification = (personId, certificationId, expiredAt) => {
  return Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification', {expired_at: expiredAt})
  })
  .then(() => {
    return "Relationship created"
  })
}

Persons.findOneByIdGetCertifications = (id) => {
  const query = `MATCH (p1:Person {id: {id}})-[r1:HAS_CERTIFICATION]->(c:Certification) RETURN {
    data: {
      certification: {
        name: c.name,
        id: c.id,
        expired_at: r1.expired_at,
        sign_off: {
          first_name: r1.signed_person_first_name, 
          last_name: r1.signed_person_last_name,
          id: r1.signed_person_id,
          signed_at: r1.signed_at
        }        
      }
    }
  }`;

  return neode.cypher(query, {id: id})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return item['_fields'][0]['data'];
    })        
    return data;
  })
}

module.exports = Persons;