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
    var dbcheck=0;
    // Query Users in DB, check if userName exists 
    var user=new userModel;
    const searchresponce=await userModel.find({ username:userName});
    dbcheck=searchresponce.length;
    if(dbcheck===1)
        {
            responseObject = {
                status: 'ERROR_USER_NAME_TAKEN',
                msg: 'login request response from server'
            };
            res.send(JSON.stringify(responseObject));
        }// If not found register
    else{
            user = new userModel({name:Name,username:userName,password:userPass,admin:type,token:null});
            user.save(function(err) {
                if (err) throw err;
                console.log('User created!');
            });
            responseObject = {
                status: 'REGISTRATION_SUCCESS',
                msg: 'login request response from server'
            };
            res.send(JSON.stringify(responseObject));
        }
})

module.exports=router;