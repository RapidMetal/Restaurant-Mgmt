//function to perform login
const router = require('express').Router();

// API request to perform login
router.post('/api/userlogin', async (req,res) => {
    // Get user name and password from server
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    var responseObject = {};
    res.set('Content-Type', 'application/json');
    
    // Query Users in DB, check if userName exists and userPass matches

    // If user not found
    responseObject = {
        status: 'ERROR_USER_NOT_FOUND',
        msg: 'login request response from server'
    };
    res.send(JSON.stringify(responseObject));

    // If password mismatch
    responseObject = {
        status: 'ERROR_PASSWORD_MISMATCH',
        msg: 'login request response from server'
    };
    res.send(JSON.stringify(responseObject));

    // If exists, generate and track session token, then respond to client with success and token

    const sessionToken = ''; //Get from DB
    responseObject = {
        status: 'LOGIN_SUCCESSFUL',
        msg: 'login request response from server',
        token: sessionToken
    }

})

module.exports = router;