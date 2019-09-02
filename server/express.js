const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.use(bodyParser.json());

require('./routes.js')(app);

module.exports = app;