const express = require('express');
const router = express.Router();
const vaccinationController = require('../controllers/vaccinationController');

router.get('/', vaccinationController.getVaccinations);
router.post('/', vaccinationController.addVaccination);
router.patch('/:id', vaccinationController.updateVaccinationStatus);

module.exports = router;
