const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const moment = require("moment");

const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY H:mm a "),
  },
});

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY H:mm a "),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});

ThoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = new mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
