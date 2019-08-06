const neode = require('../schema/index');

let Certifications = {};

Certifications.getAll = () => {
  const query = 'match (c:Certification) return c';
  return neode.cypher(query, {})
  .then((collection) => {    
    const data = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    return data;
  })   
}

Certifications.addOne = (data) => {
  return neode.create('Certification', data)
  .then((certification) => {
    return {
      name: certification.get('name')
    }
  })
}

module.exports = Certifications