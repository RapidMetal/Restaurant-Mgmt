//function to register user
const router = require('express').Router();
const userModel = require('../db').userModel;
const empModel = require('../db').empModel;

//API
router.post('/api/register',async(req,res)=>{

    // Get name,type,username and password from server
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    const Name = req.body.name;
    const type = req.body.admin;
    var responseObject = {};

    res.set('Content-Type', 'application/json');
    var dbcheck=0;

    // Query Users in DB, check if userName exists 
    const searchResponse = await userModel.find({ username:userName});
    dbcheck = searchResponse.length;

    if(dbcheck >= 1)
        {
            responseObject = {
                status: 'ERROR_USER_NAME_TAKEN',
                msg: 'login request response from server'
            };
            res.send(JSON.stringify(responseObject));
        }// If not found register
    else{
            var user = new userModel({
                name: Name,
                username: userName,
                password: userPass,
                admin: type
            });

            user.save(function(err) {
                if (err) throw err;
                console.log('User created!');
            });

            if(!user.admin){

                //New emp model
                var emp = new empModel({
                    user: user._id,
                    name: Name,
                    tips: 0,
                    avgRating: 0,
                    orderCount: 0
                });

                emp.save(function(err) {
                    if (err) throw err;
                    console.log('Emp created!');
                });
            }


            responseObject = {
                status: 'REGISTRATION_SUCCESS',
                msg: 'login request response from server'
            };

            res.send(JSON.stringify(responseObject));
        }
})

module.exports = router;