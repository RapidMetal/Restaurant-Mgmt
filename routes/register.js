//function to register user
const router=require('express').Router();

//API
router.post('/api/userRegister',async(req,res)=>{
    // Get user name and password from server
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    var responseObject = {};
    res.set('Content-Type', 'application/json');

    // Query Users in DB, check if userName exists and userPass matches

    // If user Name Taken
    responseObject = {
        status: 'ERROR_USER_NAME_TAKEN',
        msg: 'login request response from server'
    };
    res.send(JSON.stringify(responseObject));

    // If not found
    responseObject = {
        status: 'OK',
        msg: 'login request response from server'
    };
    res.send(JSON.stringify(responseObject));

})

module.exports=Router;