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

// get a certification
const show = (req, res) => {
  const id = req.params.id;
  Certifications.findOneById(id)
  .then((certification) => {
    res.status(200).json({data: certification});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json({error_message: err.message});
  })    
}

// update a certification
const update = (req, res) => {
  const id = req.params.id;
  const data = {
    id: id,
    name: req.body.name,
    is_active: req.body.is_active,
    will_expire: req.body.will_expire
  }

  Certifications.findOneByIdAndUpdate(id, data)
  .then((certification) => {
    res.status(200).json({data: certification});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json({error_message: err.message});
  })    
}

// delete a certfication
const remove = (req, res) => {
  const id = req.params.id;
  Certifications.findOneByIdAndDelete(id)
  .then((data) => {
    res.status(200).json({data: data});
  })
  .catch((err) => {
    console.log('err')
    res.status(404).json({error_message: err.message});
  })   
}

module.exports = {
  create: create,
  get: get,
  show: show,
  update: update, 
  remove: remove
}