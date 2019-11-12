//@KK - FIX YOUR FUCKING TYPING SCHEME!!!!


const itemModel = require('./db').itemModel;

var item1 = new itemModel({
    name: "Sherry Glazed Mushrooms",
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

