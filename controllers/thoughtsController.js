const { Thought, User } = require("../models");

const thoughtsController = {
  getThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createNewThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) =>
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $addToSet: { thoughts: dbThoughtData._id } },
          { new: true }
        )
      )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(400).json("Thought created but no user")
          : res.status(200).json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $unset: { thoughts: dbThoughtData._id } }
        )
      )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    ).then((dbThoughtData) =>
      !dbThoughtData
        ? res.status(404).json({ message: "No thought with that ID!" })
        : res.json(dbThoughtData)
    );
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $unset: { reactions: req.params.reactionId } },
      { new: true }
    ).then((dbThoughtData) =>
      !dbThoughtData
        ? res.status(404).json({ message: "No thought with that ID!" })
        : res.json(dbThoughtData)
    );
  },
};

module.exports = thoughtsController;
