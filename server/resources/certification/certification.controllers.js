const neode = require('../index');
const uuidv4 = require('uuid/v4');

const get = (req, res) => {
  const query = 'match (c:Certification) return c';
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

const create = (req, res) => {
  let data = {
    name: req.body.name,
    'id': uuidv4()
  }

  neode.create('Certification', data)
  .then((certification) => {
    res.status(200).json({data: {
      name: certification.get('name'),
      createdAt: certification.get('created_at'),
    }});
  })
  .catch((err) => {
    console.error(err);
    res.status(404).json(err);
  })
}

const signs = (req, res) => {
  const certificationId = req.params.id;
  const personId = req.body.personId;
  const signOffPersonId = req.body.signOffPersonId;
  const signOffDate = (new Date()).getTime();

  const query = "match (p1:Person {id:{signOffPersonId}}), ((p:Person {id:{personId}})-[:HAS_CERTIFICATION]->(c:Certification {id:{certificationId}})) create (p1)-[:SIGNS_CERTIFICATION {person_id:{personId}, signed_at:{signOffDate}}]->(c)"
  neode.cypher(query, {certificationId: certificationId, personId: personId, signOffPersonId: signOffPersonId, signOffDate: signOffDate})
  .then(() => {
    res.status(202).json({message: "Relationship created"});
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}

module.exports = {
  create: create,
  get: get,
  signs: signs
}