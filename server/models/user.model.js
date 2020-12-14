const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	pass_hash: String
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;