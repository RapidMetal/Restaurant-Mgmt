const express = require('express');
const router = express.Router();
const userModel = require('../db').userModel;
const itemModel = require('../db').itemModel;
const listModel = require('../db').listModel;
const orderModel = require('../db').orderModel;
const empModel = require('../db').empModel;

router.get('/api/test', async (req,res) => {
    try {
        console.log("Test request received.");
        var newUser = new userModel({
            name: "Hello there",
            username: "a3",
            password: "b",
            admin: false
        });
        const saveResult = await newUser.save();
        console.log(saveResult);

        var newEmp = new empModel({
            user: newUser._id,
            name: "Hello there",
            tips: 0,
            avgRating: 0,
            orderCount: 0
        });
        const saveResult2 = await newEmp.save();
        console.log(saveResult2);

        var newItem = new itemModel({
            name: "Raj ka Samosa",
            price: 10,
            type: "Appetizer"
        });
        const saveResult3 = await newItem.save();
        console.log(saveResult3);

        var newList = new listModel({
            item: newItem._id,
            quantity: "2",
            price: 20
        });
        const saveResult4 = await newList.save();
        console.log(saveResult4);

        var newOrder = new orderModel({
            empId: newUser._id,
            date: new Date("2019-11-11"),
            list: [newList._id],
            totalPrice: 20,
            tip: 1,
            rating: 4
        });
        const saveResult5 = await newOrder.save();
        console.log(saveResult5);

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