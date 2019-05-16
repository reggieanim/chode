const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(parser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Hi");
});

app.listen(process.env.PORT || 8080, function() {
  console.log("listening");
});
