const { body, validationResult } = require('express-validator')
var Profile = require('../models/Profile')

const userValidationRules = () => {
  return [
    body('password').isLength({ min: 8 })
      .withMessage('Password too short, minimum 8 characters'),
    body('password').isLength({ max: 30 })
      .withMessage('Password too long, maximum 30 characters'),

    body('name').isLength({ min: 5 })
      .withMessage('Name too short, minimum 5 characters'),
    body('name').isLength({ max: 20 })
      .withMessage('Name too long, maximum 50 characters'),

    body('username').isLength({ min: 5 })
      .withMessage('Username too short, minimum 5 characters'),
    body('username').isLength({ max: 15 })
      .withMessage('Username too long, maximum 15 characters'),
    body('username').custom(username => {
      if(!username) return true
      return Profile.find().byUsername(username.toLowerCase())
        .then(profiles => {
          if (profiles.length > 0) 
            return Promise.reject('The username is already in use')
        })
    })
  ]
}

const userValidate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = errors.array().map(
    err => { return { [err.param]: err.msg } })

  return res.status(422).json({
    ok: false,
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  userValidate,
}