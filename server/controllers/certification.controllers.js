const models = require('./../models');
const Certifications = models.Certifications;

const get = (req, res) => {
  Certifications.getAll()
  .then((data) => {
    res.status(200).json({data: data});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json({error_message: err.message});
  })     
}

// create a new type of certification
const create = (req, res) => {
  let data = {
    name: req.body.name
  }
  
  Certifications.addOne(data)
  .then((certification) => {
    res.status(200).json({data: certification});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json({error_message: err.message});
  })  
}

module.exports = {
  create: create,
  get: get
}