//#region TODO!!

/*

1. Change res formatting of the order
2. Update the employee table - current employee doc, update order count, tips, rating
3. Send new values to front end

*/

//#endregion
//Imported Data Models
const listModel =require('../db').listModel;
const orderModel = require('../db').orderModel;
const empModel = require('../db').empModel;
const router = require('express').Router();

router.post('/api/placeOrder', async (req,res) => {
    console.log(req.body);
    //Parse the Request
    const token = req.body.token;
    const order = req.body.order;
    const rating = req.body.rating;
    const tip = req.body.tip;
    
    //Update Employee
    var employee = await empModel.find({ user : token });
    employee[0].avgRating = (employee[0].avgRating*employee[0].orderCount + rating)/(employee[0].orderCount+1);
    employee[0].orderCount++;
    employee[0].tips+=tip;
    empModel.findOneAndUpdate({ user : token },employee[0],{new:true},(err,doc)=>{
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });

    //Save Order

    //Response Set
    res.set('Content-Type', 'application/json');
    var responseObject = {
        status: 'SUCCESS',
        msg: 'Order Response from server.',
        emp: {
            tips : employee[0].tips,
            rating : employee[0].avgRating,
            orderCount : employee[0].orderCount
        }
    }
    res.send(JSON.stringify(responseObject));
})

module.exports = router;