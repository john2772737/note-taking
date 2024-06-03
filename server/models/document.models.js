const { Schema, model } = require("mongoose")
const User = require('./user.models.js')
const mongoose = require('mongoose');
const Document = new Schema({
  _id: String,
  data: Object,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  
})

module.exports = model("Document", Document)