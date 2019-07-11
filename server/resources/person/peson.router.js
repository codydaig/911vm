const Router = require('express').Router;
const Controllers = require('./person.controllers');

const router = Router();

router.route('/').post(Controllers.create)

module.exports = router;