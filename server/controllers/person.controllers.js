const models = require('./../models');
const Persons = models.Persons;

// GET all volunteers
const get = (req, res) => {  
  Persons.getAll()
  .then((data) => {
    res.status(200).json({data: data});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
}

// GET a volunteer data
const show = (req, res) => { 
  const id = req.params.id;

  Persons.findOneById(id)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
}

// Add a new volunteer
const create = (req, res) => {
  const data = req.body;

  Persons.addOne(data)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })  
}

// Update volunteer
const update = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Persons.findOneByIdAndUpdate(id, data)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  }) 
}

// Delete volunteer
const remove = (req, res) => {
  const id = req.params.id;
  Persons.findOneByIdAndDelete(id)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })   
}

// ADD Certification to volunteer
const addCertification = (req, res) => {
  const personId = req.params.id;
  const certificationId = req.body.certification_id;
  const expiredAt = (new Date(req.body.expired_at)).getTime();

  Persons.findOneByIdAndAddCertification(personId , certificationId, expiredAt)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })   
}

// Get a volunteer's certifications
const getCertifications = (req, res) => {
  const id = req.params.id;
 
  Persons.findOneByIdGetCertifications(id)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })   
}

// Add a certification to a volunteer also sign off it
const addCertificationAndSignature = (req, res) => {
  const personId = req.body.person_id;
  const certificationId = req.body.certification_id;
  const signaturePersonId = req.body.signature_person_id
  const expiredAt = req.body.expired_at ? (new Date(req.body.expired_at)).getTime() : null;
  const signatureDate = req.body.signature_date ? (new Date(req.body.signature_date)).getTime() : null;

  Persons.findOneByIdAndAddCertification(personId , certificationId, expiredAt, signaturePersonId, signatureDate)
  .then((data) => {
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })
}

module.exports = {
  get: get,  
  create: create,
  show: show,
  update: update,
  remove: remove,  
  addCertification: addCertification,
  addCertificationAndSignature: addCertificationAndSignature,
  getCertifications: getCertifications
}