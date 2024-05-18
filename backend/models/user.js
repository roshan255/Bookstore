const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["author", "admin", "retail"], required: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
