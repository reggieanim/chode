const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const validator = require("../validators");

router.post("/contact", validator.sendEmailValidator, emailController.sendMail);

module.exports = router;
