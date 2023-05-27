const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));

module.exports = app;
