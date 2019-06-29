const app = require('./server/express');
const config = require('./config/config');

app.listen(config.port, () => {
  console.log(`The party is hoping on port ${config.port}`);
});