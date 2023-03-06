const { User } = require("../models");

const usersController = {
  getUsers(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createNewUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body)
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    ).then((dbUserData) =>
      !dbUserData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(dbUserData)
    );
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $unset: { friends: req.params.friendId } }
    ).then((dbUserData) =>
      !dbUserData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(dbUserData)
    );
  },
};

module.exports = usersController;
