const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const PORT = 8125
const app = express();

app.use(bp.json());
app.use(cors());

//Test comment
app.listen(PORT, () => {
    console.log('Application listening on port: ' + PORT);
});

app.use('/',require('./routes/test.js'));
app.use('/',require('./routes/register.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/order.js'));