const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connect = require('./utils/db');
const config = require('./../config/config');
const personRouter = require('./resources/person/peson.router');
const testRouter = require('./resources/test/test.router');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(morgan('dev'));

require('./routes.js')(app);

app.use('/api/person', personRouter);
app.use('/api/test', testRouter);

const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch(e) {
    console.error(e);
  }
}

module.exports = start;