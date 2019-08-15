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

Certifications.findOneById = (id) => {
  return neode.first('Certification', 'id', id)
  .then((certification) => {
    return {
      id: certification.get('id'),
      name: certification.get('name'),
      is_active: certification.get('is_active'),
      will_expire: certification.get('will_expire')
   }
 })
}

Certifications.addOne = (data) => {
  return neode.create('Certification', data)
  .then((certification) => {
    return {
      id: certification.get('id'),
      name: certification.get('name'),
      is_active: certification.get('is_active'),
      will_expire: certification.get('will_expire')
    }
  })
}

Certifications.findOneByIdAndUpdate = (id, data) => {
  return neode.first('Certification', 'id', id)
  .then((certification) => {
    return certification.update(data);
  })
  .then((updated) => {
    return {
      id: updated.get('id'),
      name: updated.get('name'),
      is_active: updated.get('is_active'),
      will_expire: updated.get('will_expire')      
    }
  })  
}

Certifications.findOneByIdAndDelete = (id) => {
  return neode.first('Certification', 'id', id)
  .then((certification) => {
    return certification.delete();
  })
  .then(() => {
    return `Successfully deleted ${id}`
  })   
}

module.exports = Certifications