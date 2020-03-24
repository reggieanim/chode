const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
var cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const emailRoute = require("./routes/emailRoute");
const userRoute = require("./routes/userRoute")


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Db connected')
})

mongoose.connection.on('error', err => {
  console.log(`Db connection error: ${err.message}`)
})

const app = express();
app.use(parser.json());
app.use(cookieParser())
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
app.use("/", userRoute)

app.listen(process.env.PORT || 8080, function() {
  console.log("listening");
});
