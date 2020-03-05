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
