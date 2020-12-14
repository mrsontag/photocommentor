const Photo = require("../models/photo.model");

module.exports.findAllPhotos = (req, res) => {
  Photo.find()
    .then(allDaPhotos => res.json( allDaPhotos ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findAllPhotosByOwnerID = (req, res) => {
	Photo.find({ owner_id: req.params.id })
		.then(oneSinglePhoto => res.json( oneSinglePhoto ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findAllPhotosByUserID = (req, res) => {
	Photo.find({ authorized_user_ids: req.params.id })
		.then(oneSinglePhoto => res.json( oneSinglePhoto ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findAllPhotosByGalleryID = (req, res) => {
	Photo.find({ _id: req.params.id })
		.then(photos => res.json( photos ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSinglePhoto = (req, res) => {
	Photo.findOne({ "photo._id" : req.params.id },  "gallery_name, photo.$")
		.then(oneSinglePhoto => res.json( oneSinglePhoto ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewGallery = (req, res) => {
  Photo.create(req.body)
    .then(newlyCreatedPhoto => res.json( newlyCreatedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.addPhotoToGallery = (req, res) => {
  Photo.findOneAndUpdate(
      { "_id" : req.params.togallery }, 
      { "$push" : {
        "photo": req.body
      }}, 
      { new: true })
    .then(addedPhoto => res.json( addedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingPhoto = (req, res) => {
  Photo.findOneAndUpdate(
      { "photo._id" : req.params.id }, 
      { "$set" : {
        "photo.$": req.body
      }}, 
      { new: true })
    .then(updatedPhoto => res.json( updatedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingGallery = (req, res) => {
  Photo.findOneAndUpdate(
      { "_id" : req.params.id }, 
      { "$set" : req.body }, 
      { new: true })
    .then(updatedPhoto => res.json( updatedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
module.exports.deleteAnExistingPhoto = (req, res) => {
  Photo.deleteOne({ _id: req.params.id })
    .then(result => res.json(result ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
