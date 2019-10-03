const moment = require('moment');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailApp = require('../utils/email')
const neode = require('../schema/index');
const auth = require('../utils/auth');

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
      //hash password
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

Persons.login = (params) => {
  const emailAddress = params.emailAddress;
  const password = params.password;

  return neode.first('Person', {email_address: emailAddress})
  .then ( (person) => {
    if ( person ) {
      const passwordHash = person.get('password');
      const isPasswordMatch = auth.checkPassword(passwordHash, password);
      if(isPasswordMatch) {
        const user = {
          id: person.get('id'),
          first_name: person.get('first_name'),
          last_name: person.get('last_name'),
          email_address: person.get('email_address'),
          phone_number: person.get('phone_number'),
          is_admin: person.get('is_admin'),
          is_volunteer: person.get('is_volunteer')
        }
        return user;
      } else {
        throw new Error('Password does not match');
      }
    } else {
      throw new Error('User does not exist.');
    } 
  })
  .then((user) => {
    const token = auth.newToken(user);
    user.token = token;
    return user;
  })   
}

Persons.forgotPassword = (emailAddress) => {
  // 1. Look up user with email address
  // 2. Generate access token
  // 3. send user reset password email with access token
  return neode.first('Person', 'email_address', emailAddress)
  .then((person) => { 
    if(person) {
      const buf = crypto.randomBytes(24);
      const token = buf.toString('hex')
      return person.update({
        id: person.get('id'),
        first_name: person.get('first_name'),
        last_name: person.get('last_name'),
        email_address: person.get('email_address'),
        reset_password_token: token,
        reset_password_expires: (new Date()).getTime() + 30 * 60000
      })
    }
    else {
      throw new Error('User does not exist.');
    }
  })
  .then((person) => {
    
    const to = person.get('email_address')
    const subject = '911 vm password reset'
    const html = `Reset link ${process.env.SERVER_ENDPOINT}/reset_password_token/${person.get('email_address')}|${person.get('reset_password_token')}`
    const email = new emailApp(to, subject, html);
    email.send()
    return 'Reset password email sent.'
  })
}

// reset password
// find user with email and reset_password_token
// compare reset_password_expires time vs now
// update user password
// return user auth token
Persons.resetPassword = (emailAddress, token, password) => {
  const now = (new Date()).getTime();
  const buf = crypto.randomBytes(24);
  const randomToken = buf.toString('hex')

  return neode.first('Person', {email_address: emailAddress, reset_password_token: token})  
  .then((person) => {
    if(!person) {
      throw new Error('User does not exist.');      
    } else if(person.get('reset_password_expires') < now) {
      throw new Error('Invalid token');
    } else {
      // hash password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);  
      return person.update({
        id: person.get('id'),
        first_name: person.get('first_name'),
        last_name: person.get('last_name'),
        email_address: person.get('email_address'),
        password: hash,
        reset_password_token: randomToken,
        reset_password_expires: 100
      })
    }
  })
  .then((person) => {
    const user = {
      id: person.get('id'),
      first_name: person.get('first_name'),
      last_name: person.get('last_name'),
      email_address: person.get('email_address'),
      phone_number: person.get('phone_number'),
      is_admin: person.get('is_admin'),
      is_volunteer: person.get('is_volunteer')
    }
    return user;    
  })
  .then((user) => {
    const token = auth.newToken(user);
    user.token = token;
    return user;
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

Persons.getAllWithCertifications = () => {
  const query = `
  MATCH (p:Person)-[r:HAS_CERTIFICATION]->(c:Certification)
  WITH p, collect({
    name: c.name,
    id: c.id,
    expriation_date: r.expriation_date,
    signature_person_id: r.signature_person_id,
    signature_person_name: r.signature_person_name,
    signature_date: r.signature_date     
  }) as certification
  RETURN {
    data: {
      person: {
        id: p.id,
        last_name: p.last_name,
        first_name: p.first_name,
        phone_number: p.phone_number,
        email_address: p.email_address,
        class: p.class,
        start_date: p.start_date        
      },
      certifications: certification
    }
  }
  `;

  return neode.cypher(query, {})
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
    return data;
  })  
}

Persons.search = (keyword) => {
  const query = `
  match (p:Person)
  where p.first_name =~ '(?i)${keyword}.*'
  or p.last_name =~ '(?i)${keyword}.*'
  or p.email_address =~ '(?i)${keyword}.*'
  return p 
  `;

  return neode.cypher(query, {})
  .then((collection) => {
    
    const data = collection.records.map((item) => {
      const person = item['_fields'][0]['properties']      
      if(person['start_date']) {person['start_date'] = moment(person['start_date']).format('YYYY-MM-DD')}
      return {
        'id': person.id,
        'email_address': person.email_address,
        'last_name': person.last_name,
        'first_name': person.first_name,
        'class': person.class,
        'start_date': person.start_date
      }
    })

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