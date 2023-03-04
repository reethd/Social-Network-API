const mongoose = require("mongoose");
const ThoughtSchema = require("./Thought");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        const emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const emailRegExp = new RegExp(emailRegEx);
        return value.match(emailRegExp);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  thoughts: [ThoughtSchema._id],
  friends: [FriendSchema._id],
});

module.exports = User;
