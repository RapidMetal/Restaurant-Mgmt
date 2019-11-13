//#region TODO!!

/*

1. Change res formatting of the order
2. Update the employee table - current employee doc, update order count, tips, rating
3. Send new values to front end

*/

//#endregion


const router = require('express').Router();

router.post('/api/placeOrder', async (req,res) => {
    console.log(req.body);
    res.set('Content-Type', 'application/json');
    var responseObject = {
        status: 'SUCCESS',
        msg: 'Order Response from server.'
    }
    res.send(JSON.stringify(responseObject));
})

module.exports = router;