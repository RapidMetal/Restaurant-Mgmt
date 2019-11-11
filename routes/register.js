//function to register user
const router=require('express').Router();
const userModel = require('../db').userModel;
//API
router.post('/api/userRegister',async(req,res)=>{
    // Get name,type,username and password from server
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    const Name=req.body.name;
    const type=req.body.admin;
    var responseObject = {};
    res.set('Content-Type', 'application/json');

    // Query Users in DB, check if userName exists 
    dbcheck=0;
    // If user Name Taken
    if(dbcheck){
    responseObject = {
        status: 'ERROR_USER_NAME_TAKEN',
        msg: 'login request response from server'
    };
    res.send(JSON.stringify(responseObject));
    }// If not found register
    else{
        var user = new userModel({name:Name,username:userName,password:userPass,admin:type,token:null});
    user.save(function(err) {
        if (err) throw err;
        console.log('User created!');
      });
    responseObject = {
        status: 'OK',
        msg: 'login request response from server'
    };
    
    res.send(JSON.stringify(responseObject));
    }
})

module.exports=router;