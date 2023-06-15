const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/insert', contactsController.postSingle);
router.put('/insert/:id', contactsController.putSingle);
router.delete('/delete/:id', contactsController.deleteSingle);

module.exports = router;