import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$/i.test(v);
      },
      message: "Invalid email format.",
    },
  },
  googleId: { type: String },
  googleSignIn: { type: Boolean, default: false },
  avatar: { type: String },
  name: { type: String },
  password: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  cinNumber: {
    type: String,
  },
  employeeCount: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
