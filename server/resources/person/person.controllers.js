const neode = require('../index');
const uuidv4 = require('uuid/v4');

const get = (req, res) => {
  const query = 'match (p:Person) return p';
  neode.cypher(query, {})
  .then((collection) => {    
    const resdata = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    res.status(202).json({data: resdata});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json(err);
  })   
}

const getWithCerts = (req, res) => {
  const query = "match (p:Person)-[r:HAS_CERTIFICATION]->(c:Certification) return {person: p, cert: collect({name:c.name, id:c.id, expirationDate:r})}"
  neode.cypher(query, {})
  .then((collection) => {
    const resdata = collection.records.map((item) => {
      const fields = item['_fields'][0];
      const certs = fields['cert'].map((cert) => {
        return {name: cert['name'], id: cert['id'], expirated_at: cert['expirationDate']['properties']['expirated_at']}
      });
      
      return {person: fields['person']['properties'], certifications: certs}
    });
    res.status(202).json({data: resdata});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json(err);
  })
}

const create = (req, res) => {
  let data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email_address: req.body.emailAddress,
    phone_number: req.body.phoneNumber,
    'class': req.body['class'],
    'id': uuidv4(),
    "is_admin": req.body.isAdmin,
    "is_volunteer": req.body.isVolunteer
  }

  neode.create('Person', data)
  .then((person) => {
    res.status(200).json({data: {
      id: person.get('id'),
      firstName: person.get('first_name'),
      lastName: person.get('last_name'),
      emailAddress: person.get('email_address'),
      phoneNumber: person.get('phone_number'),
      isAdmin: person.get('is_admin'),
      isVolunteer: person.get('is_volunteer'),
      createdAt: person.get('created_at'),
    }});
  })
  .catch((err) => {
    console.error(err);
    res.status(404).json(err);
  })
}

const addCertification = (req, res) => {
  const personId = req.params.id;
  const certificationId = req.body.certificationId;
  const expriationDate = (new Date(req.body.expriationDate)).getTime();
  
  Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification', {expirated_at: expriationDate})
  })
  .then(() => {
    res.status(202).json({message: "Relationship created"})
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}

const signCertification = (req, res) => {
  const certId = req.params.id;
  const signPersonID = req.body.person_id;
  const personId = req.params.person_id;
  const signAt = (new Date(req.body.sign_at)).getTime();

  Promise.all([
    neode.first('Person', 'id', signPersonID),
    neode.first('Certification', 'id', certId),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'signs_certification', {signed_at: signAt, person_id: personId})
  })
  .then(() => {
    res.status(202).json({message: "Relationship created"})
  })
  .catch((err) => {
    console.log(err)
    res.status(404).json(err);
  })
}

const getSignedCerts = (req, res) => {
  const personId = req.params.person_id;
  const certId = req.params.id;
  const query = 'MATCH (p:Person)-[r:SIGNS_CERTIFICATION {person_id: {person_id}}]->(c:Certification {id:{certification_id}}) return {signed_person: p, signed_at: r.signed_at}'
  neode.cypher(query, {person_id: personId, certification_id: certId})
  .then((collection) => {
    const resdata = collection.records.map((item) => {
      const fields = item['_fields'][0];  
      return {person: fields['signed_person']['properties'], signed_at: fields['signed_at']}
    });
    res.status(202).json({data: resdata});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json(err);
  })  
}

module.exports = {
  get: get,
  getWithCerts: getWithCerts,  
  create: create,
  addCertification: addCertification,
  signCertification: signCertification,  
  getSignedCerts: getSignedCerts,
}