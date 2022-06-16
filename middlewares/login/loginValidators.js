const { check } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Mobile number or email is required"),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
};

module.exports = {
  doLoginValidators,
};
