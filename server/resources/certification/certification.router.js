const Router = require('express').Router;
const Controllers = require('./certification.controllers');

const router = Router();

router.route('/').post(Controllers.create)
router.route('/').get(Controllers.get)
// router.route('/:id/signs').post(Controllers.signs)

module.exports = router;