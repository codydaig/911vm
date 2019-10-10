const models = require('./../models');
const Persons = models.Persons;
const auth = require('./../utils/auth.js');

const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if ( !bearer || !bearer.startsWith('Bearer ') ) {
    return res.status(401).json({error_message: 'Request is not permitted.'})
  }

  const token = bearer.split('Bearer ')[1].trim();

  if ( !token ) {
    return res.status(401).json({error_message: 'Request is not permitted.'})
  }

  auth.verifyToken(token)
  .then(( payload ) => {
    return Persons.findOneById(payload.id)
  })
  .then(( user ) => {
    req.user = user
    next()
  })
  .catch((e) => {
    return res.status(401).json({error_message: 'Request is not permitted. Invalid token.'})
  })
}

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

const login = (req, res) => {
  const data = req.body;
  if(!data.emailAddress || !data.password) {
    res.status(400).json({error_message: 'Missing parameter'})
  } else {
    Persons.login(data)
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

// Find all volunteers with search term
const search = (req, res) => {
  const keyword = req.body.keyword;

  Persons.search(keyword)
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
  req.body.start_date ? data['start_date'] = (new Date(req.body.start_date)).getTime() : null;
  req.body.end_date ? data['end_date'] = (new Date(req.body.end_date)).getTime() : null;

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
  data.start_date ? data['start_date'] = (new Date(data.start_date)).getTime() : null;
  data.end_date ? data['end_date'] = (new Date(data.end_date)).getTime() : null;

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
  getWithCerts: getWithCerts,
  signUp: signUp,
  login: login,
  protect: protect,
  search: search,
}