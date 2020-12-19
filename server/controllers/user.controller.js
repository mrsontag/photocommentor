const User = require("../models/user.model");

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allDaUsers => res.json(allDaUsers))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => res.json(oneSingleUser))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => res.json(newlyCreatedUser))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.addOrUpdateUser = (req, res) => {
    User.findOne({ auth0_id: req.params.auth0_id })
        .then(founduser => {
            if (founduser._id) {
                User.findOneAndUpdate({ _id: founduser._id }, req.body, { new: true })
                    .then(updatedUser => res.json(updatedUser))
            } else {
                User.create(req.body)
                    .then(newlyCreatedUser => res.json(newlyCreatedUser))
        }})
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};
