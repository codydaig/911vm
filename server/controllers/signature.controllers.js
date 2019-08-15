const models = require('./../models');
const Signatures = models.Signatures;


// Signature Routes

// GET all signatures for all users  ----   ???  Not sure about this ???? 
const getAll = (req, res) => {
  Signatures.getAll()
  .then((data) => {
    res.status(200).json({data: data});
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
}; 


// create a single signature - params: volunteerId, adminId, certificationId, date
const create = (req, res) => {
  const data = req.body;
  Signatures.create(data)
  .then ( ( newSignature ) => {
    res.status(200).json({ data: newSignature })
  })
  .catch((err) => {
    res.status(404).json({error_message: err.message});
  });
  
};  

// GET one signature by signature id
// const get = (req, res) => {
//   Signatures.get()
//   .then( (data) => {
//     res.status(200).json({data: data});
//   })
//   .catch((err) => {
//     res.status(404).json({error_message: err.message});
//   });
// };

//   app.get('/api/signature/:id', Signature.get);  // get a single signature record
//   app.put('/api/signature/:id', Signature.update); // update a signature - params : volunteerId, adminId, certificationId, date
//   app.delete('/api/signature/:id', Signature.remove);


module.exports = {
  getAll: getAll,
  create: create,
  // get: get,
}