const { Schema, model } = require("mongoose")
const User = require('./user.models.js')
const mongoose = require('mongoose');
const Document = new Schema({
 
  name:String,
  data: Object,
  user: { type:String, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  
})

module.exports = model("Document", Document)