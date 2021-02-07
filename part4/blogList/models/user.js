const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  name: { type: String },
  passwordHash: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(validator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
