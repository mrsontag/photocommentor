const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
	gallery_name: String,
	owner_id: String,
	authorized_user_ids: [ String ],
	photo: [ {
		path: String,
		ratings: [ {
            user_id: String,
            user_name: String,
			rating: Number
		} ],
		comments: [ {
            user_id: String,
            user_name: String,
			x: Number,
			y: Number,
			diam: Number,
			comment: String,
		} ]
	} ]
}, {timestamps: true});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;