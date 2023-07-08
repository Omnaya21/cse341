const express = require('express');
const {auth, requiresAuth} = require('express-openid-connect');

const appointmentstsController = require('../controllers/appointments');
const { appointmentValidationRules, validateCollection, idValidationRules } = require('../validation');

const router = express.Router();

router.get('/', requiresAuth(), appointmentstsController.getAllAppointments);
router.get('/:id', requiresAuth(), idValidationRules(), validateCollection, appointmentstsController.getAppointment);
router.post('/', requiresAuth(), appointmentValidationRules(), validateCollection, appointmentstsController.newAppointment);
router.put('/:id', requiresAuth(), idValidationRules(), appointmentValidationRules(), validateCollection, appointmentstsController.editAppointment);
router.delete('/:id', requiresAuth(), idValidationRules(), validateCollection, appointmentstsController.deleteAppointment);
router.delete('/', requiresAuth(), appointmentstsController.deleteAllAppointments);

module.exports = router;