const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/authController");

 const {userSignUpValidator} = require("../validators");

router.post("/signup",userSignUpValidator, signup);
router.post("/login", signin);
router.post("/logout", signout);

module.exports = router;
