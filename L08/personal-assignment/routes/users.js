const express = require('express');
const {requiresAuth} = require('express-openid-connect'); 

const usersController = require('../controllers/users');
const { userValidationRules, validateCollection, idValidationRules } = require('../validation');

const router = express.Router();

router.get('/', requiresAuth(), usersController.getAllUsers);
router.get('/:id', requiresAuth(), idValidationRules(), validateCollection, usersController.getUser);
router.post('/', requiresAuth(), userValidationRules(), validateCollection, usersController.newUser);
router.put('/:id', requiresAuth(), idValidationRules(), userValidationRules(), validateCollection, usersController.editUser);
router.delete('/:id', requiresAuth(), idValidationRules(), validateCollection, usersController.deleteUser);

module.exports = router;