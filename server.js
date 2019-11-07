const express = require('express');

const PORT = 8125
const app = express();

app.listen(PORT, () => {
    console.log('Application listening on port: ' + PORT);
});

app.use('/',require('./routes/test.js'));