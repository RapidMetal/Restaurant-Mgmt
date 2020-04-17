var mongoose = require('mongoose');
var mongodb = "mongodb+srv://deadw0lf:pvGOR2620@cluster0-qwfan.gcp.mongodb.net/restaurant_mgmt?retryWrites=true&w=majority";
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Make User Schema
var userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true ,unique : true },
    password: { type: String, required: true },
    admin: Boolean,
});

//Make model
var userModel = mongoose.model('User',userSchema);

//Item Schema 
var itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String
});

//Make model
var itemModel = mongoose.model('Item', itemSchema);

//List Schema
var listSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number,
    price: Number
});

//Make model
var listModel = mongoose.model('List', listSchema);

//Order Schema
var orderSchema = new mongoose.Schema({
    empId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    list: [{ type : mongoose.Schema.Types.ObjectId, ref: 'List'}],
    totalPrice: Number,
    tip: Number,
    rating: Number
});

//Make model
var orderModel = mongoose.model('Order', orderSchema);

//Employee Schema
var empSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    tips: Number,
    avgRating: Number,
    orderCount: Number
});

//Make model
var empModel = mongoose.model('Emp', empSchema);

module.exports.userModel = userModel;
module.exports.itemModel = itemModel;
module.exports.listModel = listModel;
module.exports.orderModel = orderModel;
module.exports.empModel = empModel;