const neode = require('../schema/index');

let Certifications = {};

Certifications.getAll = () => {
  const query = 'match (c:Certification) return c';
  return neode.cypher(query, {})
  .then((collection) => {    
    const resdata = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    return resdata;
  })   
}

Certifications.addOne = (data) => {
  return neode.create('Certification', data)
  .then((certification) => {
    return {
      name: certification.get('name'),
      createdAt: certification.get('created_at')
    }
  })
}

module.exports = Certifications;