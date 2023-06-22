/*const { check } = require('express-validator');
 
exports.contactsValidation = [
    check('firstName', 'First Name is requied').not().isEmpty(),
    check('lastName', 'Last Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('birthday', 'Date incorrect').isDate().not().isEmpty()
]*/

const {check, validationResult} = require('express-validator');

const contactValidationRules = () => {
  return  [
    check('firstName', 'Firstname is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('email', "Invalid email").isEmail().not().isEmpty(),
    check('favoriteColor','Favorite color is required').not().isEmpty(),
    check('birthday', 'Invalid birthday date').isDate().not().isEmpty()
  ]
}

const validateContact = (req, res, next) => {
  console.log('Starting validation');
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    console.log({err});
    extractedErrors.push({[err.path]: err.msg});
  });

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  contactValidationRules,
  validateContact
};
