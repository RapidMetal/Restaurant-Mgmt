const express = require('express');
const bp = require('body-parser');
const PORT = 8125
const app = express();

app.use(bp.json());

//Test comment
app.listen(PORT, () => {
    console.log('Application listening on port: ' + PORT);
});

app.use('/',require('./routes/test.js'));