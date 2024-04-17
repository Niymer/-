const mongoose = require('mongoose');
let AccountScheme = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  time:Date,
  type:{
    type:Number,
    default:-1
  },
  account:{
    type:Number,
    required:true
  },
  remarks:{
    type:String
  }
})
let AccountModel = mongoose.model('account', AccountScheme)
module.exports = AccountModel
