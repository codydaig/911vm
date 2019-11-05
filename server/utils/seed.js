const fs = require("fs");
const uuidv4 = require('uuid/v4');
const neode = require('./../schema/index');

const volunteers = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/volunteers.json"));
const certificationTypes = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/certificationTypes.json"));
const certificationExiprations = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/certificationExiprations.json"));
const certificationSigns = JSON.parse(fs.readFileSync(__dirname+"/./../libs/data_dump/certificationSigns.json"));
// const certificationSigns = []

const personQuery = (items) => {
  return items.map((item) => {
    const params = {
      'first_name': item['First Name'],
      'last_name': item['Last Name'],
      'email_address': item['Email'],
      'phone_number': item['Phone'].length > 0 ? item['Phone'] : null,
      'class': item['Class'],
      'start_date': item['Date Joined'].length > 0 ? (new Date(item['Date Joined']).getTime()) : null,
      'id': uuidv4()
    }
    return {'query': 'CREATE (p: Person {id: {id}, first_name: {first_name}, last_name: {last_name}, email_address: {email_address}, phone_number: {phone_number}, start_date: {start_date}, class: {class}}) RETURN p', 'params': params }
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
        queries.push({query: `MATCH (p:Person {first_name: {first_name}, 
          last_name: {last_name}}), 
          (c:Certification {name:{cert}}) 
          CREATE (p)-[:HAS_CERTIFICATION {expriation_date: {expriation_date}}]->(c)`, params: {first_name: first_name, last_name: last_name, cert: cert, expriation_date: new Date(item[cert]).getTime()}});
      }
    })
  });

  return queries;
}

const certificationSignQuery = (items) => {
  return items.map((item) => {
    return {
      'query': `MATCH (p:Person {email_address:{email_address}}),
      (p1:Person {email_address:{sign_by_email_address}}),
      (c:Certification {name:{certification_name}})
      CREATE (p)-[:HAS_CERTIFICATION {
         signature_person_id: p1.id,
         signature_person_name: p1.first_name + ' ' + p1.last_name,
         signature_date: {signature_date} }]->(c)`,
      'params': {
        email_address: item.email_address,
        sign_by_email_address: item.sign_by_email_address,
        certification_name: item.certification_name,
        signature_date: new Date(item['signed_at']).getTime()
      }
    }
  })
}

// const certificationSignQuery = (items) => {
//   return items.map((item) => {
//     return {'query': `
//     MATCH (p1:Person {email_address:{sign_by_email_address}}), 
//     ((p2:Person {email_address:{email_address}})-[r:HAS_CERTIFICATION]->(c:Certification {name:{certification_name}})) 
//     SET r.signature_person_id = p1.id, 
//     r.signature_date = {signature_date}`, params: {email_address: item.email_address, sign_by_email_address: item.sign_by_email_address, certification_name: item.certification_name, signature_date: new Date(item['signed_at']).getTime()}}
//   })
// }

const personQueries = personQuery(volunteers);
const certificationTypeQueries = certificationTypeQuery(certificationTypes);
const volunteerCertificationQueries = volunteerCertificationQuery(certificationExiprations);
const certificationSignQueries = certificationSignQuery(certificationSigns)

neode.batch(personQueries)
.then(() => {
  console.log('successed import volunteers');
  return neode.batch(certificationTypeQueries);
})
.then(() => {
  console.log('successed import certs');
  return neode.batch(volunteerCertificationQueries);
})
.then(() => {
  console.log('successed import volunteer certs');
  return neode.batch(certificationSignQueries);
})
.then(() => {
  console.log('successed import volunteer certs signature');
  neode.close()
})
.catch((err) => {
  console.log(err)
})

