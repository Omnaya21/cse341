const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.postSingle);
router.put('/:id', contactsController.putSingle);
router.delete('/:id', contactsController.deleteSingle);

module.exports = router;