const neode = require('../index');

// GET all volunteers
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

// GET a volunteer data
const show = (req, res) => {
  const id = req.params.id;
  neode.first('Person', 'id', id)
  .then((person) => {
    res.status(200).json({data: {
      id: person.get('id'),
      first_name: person.get('first_name'),
      last_name: person.get('last_name'),
      email_address: person.get('email_address'),
      phone_number: person.get('phone_number'),
      is_admin: person.get('is_admin'),
      is_volunteer: person.get('is_volunteer'),
      created_at: person.get('created_at'),
    }});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

// Add a new volunteer
const create = (req, res) => {
  let data = req.body;
  neode.create('Person', data)
  .then((person) => {
    res.status(200).json({data: {
      id: person.get('id'),
      first_name: person.get('first_name'),
      last_name: person.get('last_name'),
      email_address: person.get('email_address'),
      phone_number: person.get('phone_number'),
      is_admin: person.get('is_admin'),
      is_volunteer: person.get('is_volunteer'),
      created_at: person.get('created_at'),
    }});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

// Update volunteer
const update = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  neode.first('Person', 'id', id)
  .then((person) => {
    return person.update(data);
  })
  .then((updated) => {
    res.status(200).json({data: {
      id: updated.get('id'),
      first_name: updated.get('first_name'),
      last_name: updated.get('last_name'),
      email_address: updated.get('email_address'),
      phone_number: updated.get('phone_number'),
      is_admin: updated.get('is_admin'),
      is_volunteer: updated.get('is_volunteer'),
      created_at: updated.get('created_at'),
    }});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

// Delete volunteer
const remove = (req, res) => {
  const personId = req.params.id;
  neode.first('Person', 'id', personId)
  .then((person) => {
    return person.delete();
  })
  .then(() => {
    res.status(202).json({data: `Successfully deleted ${personId}`});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

// ADD Certification to volunteer
const addCertification = (req, res) => {
  const personId = req.params.id;
  const certificationId = req.body.certification_id;
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

// Get volunteer certifications
const getCertifications = (req, res) => {
  const id = req.params.id;
  const query = `MATCH (p:Person {id: {id}})-[r:HAS_CERTIFICATION]->(c:Certification) WITH {id: c.id, name: c.name, expired_at: r.expired_at} AS certifications RETURN {
    certification: certifications
  }`;

  neode.cypher(query, {id: id})
  .then((collection) => {
    const data = collection.records.map((item) => {
      return item['_fields'][0]['certification'];
    })    
    res.status(202).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

module.exports = {
  get: get,  
  create: create,
  show: show,
  update: update,
  remove: remove,  
  addCertification: addCertification,
  getCertifications: getCertifications
}



// HOW TO GET ALL Volunteer certifications, with sign offs
// const show = (req, res) => {
//   const id = req.params.id;
//   const query = `match (p1:Person {id: {id}}) 
//   OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification)
//   WITH p1, collect({name: c1.name, id: c1.id, expired_at: r1.expired_at}) as certifications
//   OPTIONAL MATCH (c1)-[r3:SIGNS_CERTIFICATION {person_id: p1.id}]-(p2:Person) 
//   return {
//     person: p1, 
//     certification: certifications, 
//     sign_off: collect({
//       certification_name: c1.name, 
//       certification_id: c1.id, 
//       first_name: p2.first_name, 
//       last_name: p2.last_name,
//       id: p2.id,
//       phone_number: p2.phone_number,
//       email_address: p2.email_address,
//       class: p2.class      
//     })
//   }`
  
//   neode.cypher(query, {id: id})
//   .then((collection) => {
//     const data = collection.records.map((item) => {
//       return {
//         person: item['_fields'][0]['person']['properties'],
//         certification: item['_fields'][0]['certification'],
//         sign_off: item['_fields'][0]['sign_off'],
//       }
//     })
//     res.status(202).json({data: data})
//   })
//   .catch((err) => {
//     res.status(404).json({error_message: err.message});
//   });
// }

// HOW TO GET ALL Volunteers certifications, with sign offs
// const getWithCerts = (req, res) => {
//   const query = `match (p1:Person) 
//   OPTIONAL MATCH (p1)-[r1:HAS_CERTIFICATION]->(c1:Certification)
//   WITH p1, collect({name: c1.name, id: c1.id, expired_at: r1.expired_at}) as certifications
//   OPTIONAL MATCH (c1)-[r3:SIGNS_CERTIFICATION {person_id: p1.id}]-(p2:Person) 
//   return {
//     person: p1, 
//     certification: certifications, 
//     sign_off: collect({
//       certification_name: c1.name, 
//       certification_id: c1.id, 
//       first_name: p2.first_name, 
//       last_name: p2.last_name,
//       id: p2.id,
//       phone_number: p2.phone_number,
//       email_address: p2.email_address,
//       class: p2.class      
//     })
//   }`

//   neode.cypher(query, {})
//   .then((collection) => {
//     const data = collection.records.map((item) => {
//       return {
//         person: item['_fields'][0]['person']['properties'],
//         certification: item['_fields'][0]['certification'],
//         sign_off: item['_fields'][0]['sign_off'],
//       }
//     })
//     res.status(202).json({data: data})
//   })
//   .catch((err) => {
//     res.status(404).json({error_message: err.message});
//   });
// }
