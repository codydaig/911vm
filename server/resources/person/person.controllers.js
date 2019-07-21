const neode = require('../index');

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
    res.status(404).json({error_message: err.message});
  })   
}

const show = (req, res) => {
  const id = req.params.id;
  const query = `match (p1:Person {id: {id}}) 
  OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification)
  WITH p1, collect({name: c1.name, id: c1.id, expired_at: r1.expired_at}) as certifications
  OPTIONAL MATCH (c1)-[r3:SIGNS_CERTIFICATION {person_id: p1.id}]-(p2:Person) 
  return {
    person: p1, 
    certification: certifications, 
    sign_off: collect({
      certification_name: c1.name, 
      certification_id: c1.id, 
      first_name: p2.first_name, 
      last_name: p2.last_name,
      id: p2.id,
      phone_number: p2.phone_number,
      email_address: p2.email_address,
      class: p2.class      
    })
  }`
  
  neode.cypher(query, {id: id})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return {
        person: item['_fields'][0]['person']['properties'],
        certification: item['_fields'][0]['certification'],
        sign_off: item['_fields'][0]['sign_off'],
      }
    })
    res.status(202).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
}

const create = (req, res) => {
  let data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email_address: req.body.emailAddress,
    phone_number: req.body.phoneNumber,
    'class': req.body['class'],
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
    res.status(404).json({error_message: err.message});
  })
}

const addCertification = (req, res) => {
  const personId = req.params.id;
  const certificationId = req.body.certificationId;
  const expiredAt = (new Date(req.body.expired_at)).getTime();
  
  Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification', {expired_at: expiredAt})
  })
  .then(() => {
    res.status(202).json({message: "Relationship created"})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

const getWithCerts = (req, res) => {
  const query = `match (p1:Person) 
  OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification)
  WITH p1, collect({name: c1.name, id: c1.id, expired_at: r1.expired_at}) as certifications
  OPTIONAL MATCH (c1)-[r3:SIGNS_CERTIFICATION {person_id: p1.id}]-(p2:Person) 
  return {
    person: p1, 
    certification: certifications, 
    sign_off: collect({
      certification_name: c1.name, 
      certification_id: c1.id, 
      first_name: p2.first_name, 
      last_name: p2.last_name,
      id: p2.id,
      phone_number: p2.phone_number,
      email_address: p2.email_address,
      class: p2.class      
    })
  }`

  neode.cypher(query, {})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return {
        person: item['_fields'][0]['person']['properties'],
        certification: item['_fields'][0]['certification'],
        sign_off: item['_fields'][0]['sign_off'],
      }
    })
    res.status(202).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
}

module.exports = {
  get: get,  
  create: create,
  show: show,
  getWithCerts: getWithCerts,
  addCertification: addCertification,
}