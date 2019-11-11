var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testdatabase', { useNewUrlParser: true, useUnifiedTopology: true });

//Make Schema
var userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: Boolean,
    token: String,
})

//Make model
var userModel = mongoose.model('User',userSchema);

module.exports.userModel = userModel;