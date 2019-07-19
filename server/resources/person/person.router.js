const Router = require('express').Router;
const Controllers = require('./person.controllers');

const router = Router();

router.route('/').get(Controllers.get);
router.route('/').post(Controllers.create);
router.route('/:id').get(Controllers.show);
router.route('/certification').get(Controllers.getWithCerts);
router.route('/:id/certification').post(Controllers.addCertification);
// router.route('/:person_id/certification/:id').get(Controllers.getSignedCerts);
// router.route('/:person_id/certification/:id').post(Controllers.signCertification);

module.exports = router;