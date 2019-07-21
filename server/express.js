const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

require('./routes.js')(app);

module.exports = app;