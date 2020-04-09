exports.sendEmailValidator = (req, res, next) => {
  req.check("name", "Must have a name").notEmpty();
  req
    .check("name", "Name must be more than 2 characters and less than 50")
    .isLength({
      min: 2,
      max: 50
    });
  req.check("email", "Must have a valid email").isEmail();
  req.check("message", "Must not have empty message").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map(err => err.msg)[0];

    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userSignUpValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();

  req.check("email", "Email must be 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
       min:4,
      max:2000
      })

  req.check("password", "Password is required").notEmpty();
  req.check('password')
   .isLength({min:6})
  .withMessage("Password must contain at least 6 characters")

  const errors = req.validationErrors()

  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error:firstError})
  }
  next()
}