const neode = require('../index');

const create = (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  res.status(200).json({firstName: firstName, lastName: lastName})
}

module.exports = {
  create: create
}