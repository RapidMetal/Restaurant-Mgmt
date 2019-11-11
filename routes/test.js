const express = require('express');
const router = express.Router();
const userModel = require('../db').userModel;

router.get('/api/test', async (req,res) => {
    try {
        console.log("Test request received.");
        var newUser = userModel({
            name: "Hello there",
            username: "a3",
            password: "b",
            admin: false
        });
        const saveResult = await newUser.save();
        console.log(saveResult);
        res.send("Test successful!");
    } catch (err) {
        throw err;
    }
    
})

router.post('/api/test2', (req,res) => {
    console.log("Post received");
    console.log(req.body);
    const resObject = { res: "Fuck JS!"};
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(resObject));
})

module.exports = router;