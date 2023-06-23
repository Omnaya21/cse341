const express = require('express');

const appointmentstsController = require('../controllers/appointments');
const { appointmentValidationRules, validateCollection } = require('../validation');

const router = express.Router();

router.get('/', appointmentstsController.getAllAppointments);
router.get('/:id', appointmentstsController.getAppointment);
router.post('/', appointmentValidationRules(), validateCollection, appointmentstsController.newAppointment);
router.put('/:id', appointmentValidationRules(), validateCollection, appointmentstsController.editAppointment);
router.delete('/:id', appointmentstsController.deleteAppointment);
router.delete('/', appointmentstsController.deleteAllAppointments);

module.exports = router;