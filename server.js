const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
var PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://heroku_9knzrw4k:6bik3qt8amtve0ihr1nqgbkcom@ds119064.mlab.com:19064/heroku_9knzrw4k');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
