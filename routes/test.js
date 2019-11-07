const express = require('express');
const router = express.Router();

router.get('/api/test', (req,res) => {
    console.log("Test request received.");
    res.send("Test successful!");
})

module.exports = router;