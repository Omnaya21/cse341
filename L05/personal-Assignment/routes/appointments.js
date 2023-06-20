const express = require('express');

const appointmentstsController = require('../controllers/appointments');

const router = express.Router();

router.get('/', appointmentstsController.getAllAppointments);
router.get('/:id', appointmentstsController.getAppointment);
router.post('/', appointmentstsController.newAppointment);
router.put('/:id', appointmentstsController.editAppointment);
router.delete('/:id', appointmentstsController.deleteAppointment);
router.delete('/', appointmentstsController.deleteAllAppointments);

module.exports = router;