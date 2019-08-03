const neode = require('./../schema/index');

neode.cypher('MATCH (n) DETACH DELETE n',{})
.then(() => {
  console.log('Deleted all models from Database');
  neode.close();
})
.catch((err) => {
  console.log(err.message);
  neode.close();
})