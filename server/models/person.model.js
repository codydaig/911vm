const moment = require('moment');
const neode = require('../schema/index');
const auth = require('../utils/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let Persons = {};

Persons.signUp = (params) => {
const {emailAddress, firstName, lastName, password} = params;

// check if user already exists
//   error
// check valid email and valid password inputs (TODO later)
// hash the password
// get salt and and combine with hash
// save salt/hash to DB as password
// return an authentication token

return neode.first('Person', {email_address: emailAddress})
.then ( (user) => {
  if ( user ) {
   throw new Error('User already exists')
  } else {
    // hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    const data = {email_address: emailAddress, first_name: firstName, last_name: lastName, password: hash};
    
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
      .then((user) => {
        const token = auth.newToken(user);
        user.token = token;
        return user;
      })
    
  }
  
})


}

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
  const query = `
  MATCH (p1:Person {id: {id}}) 
  OPTIONAL MATCH (p1:Person {id: {id}})-[r1:HAS_CERTIFICATION]->(c:Certification)
  WITH p1, collect({
    name: c.name,
    id: c.id,
    expriation_date: r1.expriation_date,
    signature_person_id: r1.signature_person_id,
    signature_person_name: r1.signature_person_name,
    signature_date: r1.signature_date       
  }) as certification
  RETURN {
    data: {
      person: {
        id: p1.id,
        last_name: p1.last_name,
        first_name: p1.first_name,
        phone_number: p1.phone_number,
        email_address: p1.email_address,
        class: p1.class,
        start_date: p1.start_date        
      },
      certifications: certification
    }
  }`;

  return neode.cypher(query, {id: id})
  .then((collection) => {
    const data = collection.records.map((item) => {
      const person = item['_fields'][0]['data']['person'];            
      if(person['start_date']) {person['start_date'] = moment(person['start_date']).format('YYYY-MM-DD')}      
      const certifications = item['_fields'][0]['data']['certifications'];            
      certifications.forEach((cert) => {
        if(cert['expriation_date']) cert['expriation_date'] = moment(cert['expriation_date']).format('YYYY-MM-DD')
        if(cert['signature_date']) cert['signature_date'] = moment(cert['signature_date']).format('YYYY-MM-DD')
      })
      return item['_fields'][0]['data'];
    })
    if(data[0]['certifications'][0]['id'] === null) {
      data[0]['certifications'] = []
    }
    return data[0];
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

// Add a certification to a volunteer as well as signed it off by admin
Persons.addCertificationAndSignature = (personId, certificationId, expriationDate, signaturePersonId, signatureDate) => {  
  return Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
    neode.first('Person', 'id', signaturePersonId),
  ])
  .then(([person, certification, signaturePerson]) => {
    let _data = {
      expriation_date: expriationDate,
      signature_person_id: signaturePerson.get('id'),
      signature_person_name: `${signaturePerson.get('first_name')} ${signaturePerson.get('last_name')}`,
      signature_date: signatureDate
    }
    let data = {}
    
    Object.keys(_data).forEach((key) => {
      if(_data[key]) {
        data[key] = _data[key]
      }      
    })
    return person.relateTo(certification, 'has_certification', data)
  })
  .then(() => {
    return "Relationship created"
  })  
}

// Add a certification to a volunteer
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

// Update signature on a certification
Persons.updateCertifcation = (data) => {
  //id, certificationId, expiredAt, signOffPersonId, signatureDate
  const id = data.id;
  const certificationId = data.certificationId;
  const expiredAt = data.expiredAt;
  const signaturePersonId = data.signaturePersonId;
  const signatureDate = data.signatureDate;

  const query =  `  
  MATCH (p2:Person {id:{id}})-[r:HAS_CERTIFICATION]->(c:Certification {id:{certificationId}})
  OPTIONAL MATCH (p1:Person {id: {signaturePersonId}}) 
  SET r.signature_person_id = CASE WHEN {signaturePersonId} IS NOT NULL THEN {signaturePersonId} ELSE r.signature_person_id END,
  r.signature_person_name = CASE WHEN {signaturePersonId} IS NOT NULL THEN p1.first_name + ' ' + p1.last_name ELSE r.signature_person_name END,
  r.signature_date = CASE WHEN {signatureDate} IS NOT NULL THEN {signatureDate} ELSE r.signature_date END,
  r.expriation_date = CASE WHEN {expiredAt} IS NOT NULL THEN {expiredAt} ELSE r.expriation_date END
  RETURN r`
  
  return neode.cypher(query, {id: id, certificationId: certificationId, expiredAt: expiredAt, signaturePersonId: signaturePersonId, signatureDate: signatureDate})
  .then((res) => {
    return res.records[0]['_fields'][0]['properties'];
  })
}

module.exports = Persons;