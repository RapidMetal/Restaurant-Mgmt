//function to perform login

//#region TASKS TO DO!!
/*@Pavan :
    1. Send all the items during login using async function
    2. Async funtion to return employee history

@KK:
    1. Improve the naming scheme!!
*/
//#endregion


const router = require('express').Router();
const userModel = require('../db').userModel;
const itemModel = require('../db').itemModel;
const orderModel = require('../db').orderModel;
const empModel = require('../db').empModel;

// API request to perform login
router.post('/api/login', async (req,res) => {
    try{
        // Get user name and password from server
        const userName = req.body.userName;
        const userPass = req.body.userPass;
        var responseObject = {};
        res.set('Content-Type', 'application/json');
        var dbcheck = 0;
    
        // Query Users in DB, check if userName exists and userPass matches
        const searchResponse = await userModel.find({ username:userName});
        dbcheck = searchResponse.length;
    
        if(dbcheck === false){
            // If user not found
            responseObject = {
                status: 'ERROR_USER_NOT_FOUND',
                msg: 'login request response from server'
            };
            res.send(JSON.stringify(responseObject));
        }
        else {
            dbcheck = false;
            console.log("User found");
    
            if(searchResponse[0].password === userPass)
                dbcheck = 1;
    
            if(dbcheck === false){
    
                // If password mismatch
                responseObject = {
                    status: 'ERROR_PASSWORD_MISMATCH',
                    msg: 'login request response from server'
                };
    
                res.send(JSON.stringify(responseObject));
                console.log("Password Mismatch");
            }
            else{
    
                responseObject = {
                    status: 'LOGIN_SUCCESSFUL',
                    msg: 'login request response from server',
                    token: searchResponse[0]._id,
                    isManager: searchResponse[0].admin,
                    name: searchResponse[0].name
                }
                

                //@Pavan - If employee, respond with name, sessionToken, emp details and the menu 
                if(searchResponse[0].admin === false){

                    //@Pavan - Send the available menu and employee details
                    const menuResponse = await returnMenu();
                    const empResponse = await returnEmpDetails(searchResponse[0]._id);
                    responseObject = {
                        ...responseObject,
                        menu: menuResponse,
                        emp: empResponse
                    };
                }
                //@Pavan - If manager, return the total number of orders, total revenue, total tips, avg order rating
                else{

                    const manResponse = await returnManDetails();
                    const empResponse = await returnAllEmployees();
                    responseObject = {
                        ...responseObject,
                        empList: empResponse,
                        restaurantDetails: manResponse
                    };
                }
    
    
                // If exists, generate and track session token, then respond to client with success and token
                const sessionToken = ''; //Get from DB
                res.send(JSON.stringify(responseObject));
                }
                console.log("User logged in");
            }
    }
    catch(err){
        throw err;
    }
});

module.exports = router;

//#region Login Functions

async function returnMenu() {
    try{
        const menuResponse = await itemModel.find();
        return menuResponse;
    }
    catch(err){
        throw err;
    }
}

async function returnEmpDetails(userID){
    try{
        const empResponse = await empModel.find({ user : userID });
    
        console.log(empResponse);

        const empSendList = {
            name : empResponse[0].name,
            tips : empResponse[0].tips,
            rating : empResponse[0].avgRating,
            orderCount : empResponse[0].orderCount,
        };
    
        return empSendList;
    }
    catch(err){
        throw err;
    }
}

async function returnAllEmployees(){
    try{
        const empResponse = await empModel.find();
        return empResponse;
    }
    catch(err){
        throw err;
    }
}

async function returnManDetails(){
    try{
        var _orderTotal = await orderModel.find().count();
        console.log(_orderTotal);
        //@Pavan - Coz Fuck Mongo, that's why
        const revTotalResponse = await orderModel.aggregate([ { $group: { _id: null, "totalRevenue": { $sum: "$totalPrice" }, "totalTips": { $sum: "$tip" }
    , "ratingTotal": { $sum: "$rating" } } } ]); 
        console.log(revTotalResponse);
        var _revTotal = revTotalResponse[0].totalRevenue;
        var _tipTotal = revTotalResponse[0].totalTips;
        var ratingTotal = revTotalResponse[0].ratingTotal;
        var _ratingAvg = ratingTotal/_orderTotal;
    
        const manSendList = {
            orderCount: _orderTotal,
            revenue: _revTotal,
            tips: _tipTotal,
            rating: _ratingAvg
        };
    
        return manSendList;
    }
    catch(err){
        throw err;
    }
}

//#endregion