const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// const personRouter = require('./resources/person/person.router');
// const certificationRouter = require('./resources/certification/certification.router');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
app.use(bodyParser.json());

require('./routes.js')(app);

// app.use('/api/person', personRouter);
// app.use('/api/certification', certificationRouter);

module.exports = app;