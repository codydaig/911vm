const neode = require('../schema/index');

let Signatures = {};


Signatures.getAll = () => {
  const query = 'match (s:Signature) return s';
  return neode.cypher(query, {})
  .then((collection) => {    
    const data = collection.records.map((item) => {
      return item['_fields'][0]['properties']
    });
    return data;
  }) 
};

Signatures.create = ( params ) => {
  const query = 'match'
}

module.exports = Signatures;