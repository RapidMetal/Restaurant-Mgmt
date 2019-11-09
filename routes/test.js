const express = require('express');
const router = express.Router();

router.get('/api/test', (req,res) => {
    console.log("Test request received.");
    res.send("Test successful!");
})

router.post('/api/test2', (req,res) => {
    console.log("Post received");
    console.log(req.body);
    const resObject = { res: "Fuck JS!"};
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(resObject));
})

module.exports = router;