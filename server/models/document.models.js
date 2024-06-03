const { Schema, model } = require("mongoose")
const User = require('./user.models.js')
const Document = new Schema({
  _id: String,
  data: Object,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = model("Document", Document)