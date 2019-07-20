const fs = require("fs");
const uuidv4 = require('uuid/v4');
const neode = require('./../resources/index');

const volunteers = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/volunteers.json"));
const certificationTypes = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/certificationTypes.json"));
const certifications = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/certifications.json"));

const personQuery = (items) => {
  return items.map((item) => {
    const params = {
      'first_name': item['First Name'],
      'last_name': item['Last Name'],
      'email_address': item['Email'],
      'phone_number': item['Phone'].length > 0 ? item['Phone'] : null,
      'class': item['Class'],
      'start_date': item['Date Joined'].length > 0 ? (new Date(item['Date Joined']).getTime()) : null,
      'id': uuidv4(),
      'created_at': (new Date).getTime(),
    }
    return {'query': 'CREATE (p: Person {id: {id}, first_name: {first_name}, last_name: {last_name}, email_address: {email_address}, phone_number: {phone_number}, start_date: {start_date}, class: {class}, created_at: {created_at}}) RETURN p', 'params': params }
  });
}

const certificationTypeQuery = (items) => {
  return items.map((item) => {
    const params = {
      'name': item,
      'id': uuidv4(),
    }
    return {'query': 'CREATE (p: Certification {name: {name}, id: {id}}) RETURN p', 'params': params }
  });  
}

const volunteerCertificationQuery = (items) => {
  let queries = [];
  items.forEach((item) => {
    const name = item['Name'];
    const first_name = name.split(' ')[0];
    const last_name = name.split(' ')[1];
    const certifications = Object.keys(item);    
    certifications.forEach((cert) => {
      if(cert !== 'Name' && item[cert] !== '' && item[cert] !== 'n/a') {
        queries.push({query: 'MATCH (p:Person {first_name: {first_name}, last_name: {last_name}}), (c:Certification {name:{cert}}) CREATE (p)-[:HAS_CERTIFICATION {expired_at: {expired_at}}]->(c)', params: {first_name: first_name, last_name: last_name, cert: cert, expired_at: new Date(item[cert]).getTime()}});
      }
    })
  });

  return queries;
}

const personQueries = personQuery(volunteers);
const certificationTypeQuries = certificationTypeQuery(certificationTypes.data);
const volunteerCertificationQueries = volunteerCertificationQuery(certifications);

neode.batch(personQueries)
.then(() => {
  console.log('successed import volunteers');
  return neode.batch(certificationTypeQuries);
})
.then(() => {
  console.log('successed import certs');
  return neode.batch(volunteerCertificationQueries)
})
.then(() => {
  console.log('successed import volunteer certs');
  neode.close()
})
.catch((err) => {
  console.log(err)
})

