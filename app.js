const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const emailRoute = require("./routes/emailRoute");

const app = express();
app.use(parser.json());
app.use(expressValidator());
app.use(morgan("dev"));
app.use(cors());

// var allowCrossDomain = function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// };

app.use("/", emailRoute);

app.listen(process.env.PORT || 8080, function() {
  console.log("listening");
});
