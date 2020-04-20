const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8125
const app = express();

app.use(bp.json());
app.use(cors());

//Test comment
var server = app.listen(PORT, () => {
    console.log('Application listening on port: ' + PORT);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    server.close();
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    server.close();
    process.exit(1);
  })
  .on('SIGTERM', err=> {
      server.close();
      process.exit(1);
  })
  .on('SIGINT', err=> {
    server.close();
    process.exit(1);
});

app.use('/',require('./routes/test.js'));
app.use('/',require('./routes/register.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/order.js'));