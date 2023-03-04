const mongoose = require("mongoose");
const Thought = require("./Thought");

const Friend = mongoose.model("Friend", UserSchema);

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
  thoughts: [Thought._id],
  friends: [Friend._id],
});

UserSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("user", UserSchema);

module.exports = User;
