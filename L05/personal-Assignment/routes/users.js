const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.newUser);
router.put('/:id', usersController.editUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;