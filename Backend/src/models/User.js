const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    PhoneNumber: Number,
    FName: {
      type: String,
    },
    LName: {
      type: String,
    },
    AuthType: String,
    Wishlist: [
      {
        gameID: Number,
        slug: String,
        steamID: String,
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
