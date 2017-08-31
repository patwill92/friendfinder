const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
var PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// const arr1 = [-5,-6,-1,-2,-4];
// const arr2 = [5,3,3,2,4];
//
// console.log(_.sum([...arr1,...arr2]));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});


app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
