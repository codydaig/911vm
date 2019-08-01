const Router = require('express').Router;
const Controllers = require('./person.controllers');

const router = Router();

router.route('/').get(Controllers.get);
router.route('/').post(Controllers.create);
router.route('/:id').get(Controllers.show);
router.route('/:id').put(Controllers.update);
router.route('/:id').delete(Controllers.remove);
router.route('/:id/certification').post(Controllers.addCertification);
router.route('/:id/certification').get(Controllers.getCertifications);
// router.route('/:person_id/certification/:id').post(Controllers.signCertification);

module.exports = router;