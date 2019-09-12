const models = require('./../models');
const Persons = models.Persons;

const signUp = (req, res) => {
  const data = req.body;
  if ( !data.emailAddress || !data.firstName || !data.lastName || !data.password ) {
    res.status(400).json({error_message: 'Missing parameter'})
  } else {
    Persons.signUp(data)
    .then((data) => {
      res.status(201).json({data: data})
    })
    .catch((err) => {
      res.status(400).json({error_message: err.message})
    });
  }
}

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

// GET all volunteers with their certification
const getWithCerts = (req, res) => {  
  Persons.getAllWithCertifications()
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

// ADD Certification to volunteer and sign off it
const addCertificationAndSignature = (req, res) => {
  const personId = req.params.id;
  const certificationId = req.body.certification_id;
  const signaturePersonId = req.body.signature_person_id
  const expiredAt = req.body.expriation_date ? (new Date(req.body.expriation_date)).getTime() : null;
  const signatureDate = req.body.signature_date ? (new Date(req.body.signature_date)).getTime() : (new Date()).getTime();
  
  Persons.addCertificationAndSignature(personId , certificationId, expiredAt, signaturePersonId, signatureDate)
  .then((data) => {    
    res.status(200).json({data: data})
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  })  
}

// Update signature on a certification
const updateCertifcation = (req, res) => {
  const signatureDate = req.body.signature_date ? (new Date(req.body.signature_date)).getTime() : null;
  const expiredAt = req.body.expriation_date ? (new Date(req.body.expriation_date)).getTime() : null;

  const updateData = {
    id: req.params.id,
    certificationId: req.params.certification_id,
    expiredAt: expiredAt,
    signatureDate: signatureDate,
    signaturePersonId: req.body.signature_person_id ? req.body.signature_person_id : null
  }

  Persons.updateCertifcation(updateData)
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
  addCertificationAndSignature: addCertificationAndSignature,
  updateCertifcation: updateCertifcation,
  signUp: signUp,
  getWithCerts: getWithCerts
}