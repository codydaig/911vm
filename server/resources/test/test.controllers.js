const neode = require('../index');
const uuidv4 = require('uuid/v4');

const get = (req, res) => {
  const query = 'match (c:Test) return c';
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

  neode.create('Test', data)
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

module.exports = {
  get: get,
  create: create
}