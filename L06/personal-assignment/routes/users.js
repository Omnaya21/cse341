const express = require('express');

const usersController = require('../controllers/users');
const { userValidationRules, validateCollection, idValidationRules } = require('../validation');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', idValidationRules(), validateCollection, usersController.getUser);
router.post('/', userValidationRules(), validateCollection, usersController.newUser);
router.put('/:id', idValidationRules(), userValidationRules(), validateCollection, usersController.editUser);
router.delete('/:id', idValidationRules(), validateCollection, usersController.deleteUser);

module.exports = router;