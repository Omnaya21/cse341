const express = require('express');

const usersController = require('../controllers/users');
const { userValidationRules, validateCollection } = require('../validation');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/', userValidationRules(), validateCollection, usersController.newUser);
router.put('/:id', userValidationRules(), validateCollection, usersController.editUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;