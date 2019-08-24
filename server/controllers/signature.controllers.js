const models = require('./../models');
const Signatures = models.Signatures;


// create a single signature 
const create = (req, res) => {
  const data = req.body;
  Signatures.create(data)
  .then ( ( newSignature ) => {
    res.status(200).json({ data: newSignature })
  })
  .catch((err) => {
    res.status(404).json({error_message: err});
  });
  
};  


module.exports = {
  create: create,
}