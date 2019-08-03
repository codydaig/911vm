const app = require('./server/express');
const connect = require('./server/utils/db');
const config = require('./config/config');

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

start();
