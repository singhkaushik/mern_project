const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, 
});

module.exports = mongoose.model("User", UserSchema);
