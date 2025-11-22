import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this email. Please register." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    res.status(200).json({ message: "Sign-in successful.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default signin;
