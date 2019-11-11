//function to perform login
const router = require('express').Router();
const userModel = require('../db').userModel;

// API request to perform login
router.post('/api/userlogin', async (req,res) => {
    // Get user name and password from server
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    var responseObject = {};
    res.header('Content-Type', 'application/json');
    var dbcheck=0;
    // Query Users in DB, check if userName exists and userPass matches
    const searchresponce=await userModel.find({ username:userName});
    dbcheck=searchresponce.length;
    if(dbcheck===0){
        // If user not found
        responseObject = {
            status: 'ERROR_USER_NOT_FOUND',
            msg: 'login request response from server'
        };
        res.send(JSON.stringify(responseObject));
    }
    else {
        dbcheck=0;
        console.log("User found");
        if(searchresponce[0].password===userPass)
            dbcheck=1;

        if(dbcheck===0){
            // If password mismatch
            responseObject = {
                status: 'ERROR_PASSWORD_MISMATCH',
                msg: 'login request response from server'
            };
            res.send(JSON.stringify(responseObject));
            console.log("Password Mismatch");
        }
        else{
            // If exists, generate and track session token, then respond to client with success and token
            const sessionToken = ''; //Get from DB
            responseObject = {
                status: 'LOGIN_SUCCESSFUL',
                msg: 'login request response from server',
                token: sessionToken
            }
            res.send(JSON.stringify(responseObject));
            console.log("User logged in");
        }
    }
})

module.exports = router;