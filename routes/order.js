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