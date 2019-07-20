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
    console.log('err')
    res.status(404).json(err);
  })   
}

const show = (req, res) => {
  const id = req.params.id;
  const query = "match (p1:Person {id: {id}}) OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification) OPTIONAL MATCH (p1)-[r2:HAS_CERTIFICATION]->(c2:Certification)-[r3:SIGNS_CERTIFICATION]-(p2:Person) return {person: p1, certification: collect({name: c1.name, certification_id: c1.id,  expired_at: r1.expired_at, signed_by: p2})}"
  neode.cypher(query, {id: id})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return {
        person: item['_fields'][0]['person']['properties'],
        certification: item['_fields'][0]['certification']
      }
    })
    res.status(202).json({data: data})
  })
  .catch((err) => {
    res.status(404).json(err);
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
    console.error(err);
    res.status(404).json(err);
  })
}

const addCertification = (req, res) => {
  const personId = req.params.id;
  const certificationName = req.body.certificationName;
  const expiredAt = (new Date(req.body.expired_at)).getTime();
  
  Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'name', certificationName),
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification', {expired_at: expiredAt})
  })
  .then(() => {
    res.status(202).json({message: "Relationship created"})
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}

const getWithCerts = (req, res) => {
  // const query = "match (p1:Person)-[r1:HAS_CERTIFICATION]->(c:Certification)-[r2:SIGNS_CERTIFICATION]-(p2:Person) return {person: p1, cert: collect({name:c.name, id:c.id, expirationDate:r})}"
  const query = "match (p1:Person) OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification) OPTIONAL MATCH (p1)-[r2:HAS_CERTIFICATION]->(c2:Certification)-[r3:SIGNS_CERTIFICATION]-(p2:Person) return {person: p1, certification: collect({name: c1.name, certification_id: c1.id,  expired_at: r1.expired_at, signed_by: p2})}"
  neode.cypher(query, {})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return {
        person: item['_fields'][0]['person']['properties'],
        certification: item['_fields'][0]['certification']
      }
    })
    res.status(202).json({data: data})
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}

module.exports = {
  get: get,  
  create: create,
  show: show,
  getWithCerts: getWithCerts,
  addCertification: addCertification,
}