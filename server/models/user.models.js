const mongoose = require("mongoose");
const Document = require("./document.models.js");

const userSchema = new mongoose.Schema({
  firebaseuid: String,
  name: String,
  email: String,
  imageUrl: String,
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }], // Change to array
});

const User = mongoose.model("User", userSchema);

module.exports = User;
