const userModel = require('./db').userModel;
const itemModel = require('./db').itemModel;
const listModel = require('./db').listModel;
const orderModel = require('./db').orderModel;
const empModel = require('./db').empModel;

//#region Items
var item1 = new itemModel({
    name: "Sherry Glazd Mushrooms",
    price: 250,
    type: "Appetizer"
});
item1.save().then(() => console.log('1 saved.'));


var item2 = new itemModel({
    name: "Spicy Broiled Oysters",
    price: 350,
    type: "Appetizer"
});
item2.save().then(() => console.log('2 saved.'));

var item3 = new itemModel({
    name: "Cheesy Pita Chips",
    price: 175,
    type: "Appetizer"
});
item3.save().then(() => console.log('3 saved.'));

var item4 = new itemModel({
    name: "Roast Chicken Breast",
    price: 400,
    type: "Main Course"
});
item4.save().then(() => console.log('4 saved.'));

var item5 = new itemModel({
    name: "Slow Roasted Salmon",
    price: 475,
    type: "Main Course"
});
item5.save().then(() => console.log('5 saved.'));

var item6 = new itemModel({
    name: "Spinach Ricotta Gnocchi",
    price: 350,
    type: "Main Course"
});
item6.save().then(() => console.log('6 saved.'));

var item7 = new itemModel({
    name: "Cottage Pie",
    price: 375,
    type: "Main Course"
});
item7.save().then(() => console.log('7 saved.'));

var item8 = new itemModel({
    name: "Strawberry Crumble",
    price: 250,
    type: "Dessert"
});
item8.save().then(() => console.log('8 saved.'));

var item9 = new itemModel({
    name: "Chocolate Cheesecake",
    price: 275,
    type: "Dessert"
});
item9.save().then(() => console.log('9 saved.'));

var item10 = new itemModel({
    name: "Coconut Pie",
    price: 250,
    type: "Dessert"
});
item10.save().then(() => console.log('10 saved.'));
//#endregion

//#region Users and Employees
var user1 = new userModel({
    name: "Pavan",
    username: "DeadWolf",
    password: "106116027",
    admin: true
});
user1.save().then(() => console.log('User 1 saved.'));

var user2 = new userModel({
    name: "Rutvik",
    username: "Slow",
    password: "106116075",
    admin: false
});
user2.save().then(() => console.log('User 2 saved.'));

var user3 = new userModel({
    name: "KK",
    username: "KK",
    password: "106116044",
    admin: false
});
user3.save().then(() => console.log('User 3 saved.'));

var emp1 = new empModel({
    user: user2._id,
    name: "Rutvik",
    tips: 69,
    avgRating: 4.2,
    orderCount: 2
});
emp1.save().then(() => console.log('Emp 1 saved.'));

var emp2 = new empModel({
    user: user3._id,
    name: "KK",
    tips: 20,
    avgRating: 4,
    orderCount: 1
});
emp2.save().then(() => console.log('Emp 2 saved.'));
//#endregion

//#region Lists and Orders
var list1 = new listModel({
    item: item2._id,
    quantity: 1,
    price: 350
});
list1.save().then(() => console.log('List 1 saved.'));

var list2 = new listModel({
    item: item4._id,
    quantity: 1,
    price: 400
});
list2.save().then(() => console.log('List 2 saved.'));

var order1 = new orderModel({
    empId: user2._id,
    
})
order1.save().then(() => console.log('Order 1 saved.'));


//#endregion