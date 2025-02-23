const { body, validationResult } = require("express-validator");

const passwordValidation = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be 8 characters long")
  .matches(/[A-Za-z]/)
  .withMessage("Password must contain at least one letter");

const validateRegistration = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  passwordValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePasswordReset = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be 8 characters long")
    .matches(/[A-Za-z]/)
    .withMessage("New password must contain at least one letter"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegistration, validateLogin, validatePasswordReset };
