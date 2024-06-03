const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firebaseuid: String,
    name: String,
    email: String,
    imageUrl: String,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
