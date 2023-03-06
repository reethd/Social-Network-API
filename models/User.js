const mongoose = require("mongoose");
const Thought = require("./Thought");

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
        const emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const emailRegExp = new RegExp(emailPattern);
        return value.match(emailRegExp);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
