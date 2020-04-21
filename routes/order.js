//#region TODO!!

/*

Done-1. Change res formatting of the order
Done-2. Update the employee table - current employee doc, update order count, tips, rating
Done-3. Send new values to front end
4-Order Storage
*/

//#endregion

//Imported Data Models
const listModel =require('../db').listModel;
const orderModel = require('../db').orderModel;
const empModel = require('../db').empModel;
const router = require('express').Router();

router.post('https://obscure-mesa-77509.herokuapp.com/api/placeOrder', async (req,res) => {
    console.log(req.body);
    //Parse the Request
    const token = req.body.token;
    const reqorder = req.body.order;
    const rating = req.body.rating;
    const tip = req.body.tip;
    const TotalPrice = req.body.totalPrice;
    //Update Employee
    var employee = await empModel.find({ user : token });
    employee[0].avgRating = (employee[0].avgRating * employee[0].orderCount + rating)/
                                (employee[0].orderCount + 1);
    employee[0].orderCount++;
    employee[0].tips+=tip;
    empModel.findOneAndUpdate({ user : token },employee[0],{new:true},(err,doc)=>{
        if(err){
            console.log("Something wrong when updating data!");
        }
        //console.log(doc);
    });

    //Save Order
    var orderlist = [];
    for( var i in reqorder )
    {
        orderlist.push({
            _id : reqorder[i]._id ,
            price : reqorder[i].price ,
            quantity : reqorder[i].quantity
        })
    }
    console.log(reqorder.length);
    var order = new orderModel({
        empId: token,
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        list: orderlist,
        totalPrice: TotalPrice,
        tip: tip,
        rating: rating
    });

    order.save(function(err){
        if(err) throw err;
        console.log("Order Saved");
        console.log(order);
    })

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