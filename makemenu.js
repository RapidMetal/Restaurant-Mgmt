//@KK - FIX YOUR FUCKING TYPING SCHEME!!!!


const itemModel = require('./db').itemModel;

var item1 = new itemModel({
    name: "Sherry Glazed Mushrooms",
    price: 250,
    type: "Appetizer"
});
item1.save();

var item2 = new itemModel({
    name: "Spicy Broiled Oysters",
    price: 350,
    type: "Appetizer"
});
item2.save();

var item3 = new itemModel({
    name: "Cheesy Pita Chips",
    price: 175,
    type: "Appetizer"
});
item3.save();

var item4 = new itemModel({
    name: "Roast Chicken Breast",
    price: 400,
    type: "Main Course"
});
item4.save();

var item5 = new itemModel({
    name: "Slow Roasted Salmon",
    price: 475,
    type: "Main Course"
});
item5.save();

var item6 = new itemModel({
    name: "Spinach Ricotta Gnocchi",
    price: 350,
    type: "Main Course"
});
item6.save();

var item7 = new itemModel({
    name: "Cottage Pie",
    price: 375,
    type: "Main Course"
});
item7.save();

var item8 = new itemModel({
    name: "Strawberry Crumble",
    price: 250,
    type: "Dessert"
});
item8.save();

var item9 = new itemModel({
    name: "Chocolate Cheesecake",
    price: 275,
    type: "Dessert"
});
item9.save();

var item10 = new itemModel({
    name: "Coconut Pie",
    price: 250,
    type: "Dessert"
});
item10.save();

