const mongoose = require('mongoose');

let UserScheme = new mongoose.Schema({
  username: String,
  password: String,
})

let UserModel = mongoose.model('users', UserScheme)

module.exports = UserModel
