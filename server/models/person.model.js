const neode = require('../schema/index');

let Persons = {};

Persons.getAll = () => {
  const query = 'match (p:Person) return p';
  return neode.cypher(query, {})
  .then((collection) => {    
    const data = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    return data;
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
      is_volunteer: person.get('is_volunteer')
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
      is_volunteer: person.get('is_volunteer')
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
      is_volunteer: updated.get('is_volunteer')
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

Persons.findOneByIdAndAddCertification = (personId, certificationId, expriationDate) => {
  return Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification', {expriation_date: expriationDate})
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
        expriation_date: r1.expriation_date,
        signature_person_id: r1.signature_person_id,
        signature_person_name: r1.signature_person_name,
        signature_date: r1.signature_date
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

Persons.addCertificationAndSignature = (personId, certificationId, expriationDate, signaturePersonId, signatureDate) => {
  return Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
    neode.first('Person', 'id', signaturePersonId)
  ])
  .then(([person, certification, signaturePerson]) => {
    return person.relateTo(certification, 'has_certification', {
      expriation_date: expriationDate,
      signature_person_id: signaturePersonId.id,
      signature_person_name: `${signaturePerson.first_name} ${signaturePerson.last_name}`,
      signature_date: signatureDate
    })
  })
  .then(() => {
    return "Relationship created"
  })  
}

module.exports = Persons;