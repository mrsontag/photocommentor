const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	name: String,
    email: String,
    phone: String,
    type: String,
	auth0_id: String
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;