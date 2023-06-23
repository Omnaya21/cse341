const express = require('express');
const router = express.Router();
const {contactValidationRules, validateContact} = require('../validation');

const contactsController = require('../controllers/contacts');


router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactValidationRules(), validateContact, contactsController.createContact);

router.put('/:id', contactValidationRules(), validateContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
