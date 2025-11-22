import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

// Regex
const GST_REGEX = /^[0-9]{2}[A-Z0-9]{10}[0-9]Z[0-9A-Z]$/;
const CIN_REGEX = /^[A-Z]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signup = async (req, res) => {
  try {
    const { email, password, gstNumber, cinNumber, employeeCount } = req.body;

    // Validations
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    if (employeeCount && isNaN(employeeCount)) {
      return res
        .status(400)
        .json({ message: "Employee count must be a number." });
    }

    // Optional fields validation
    if (gstNumber && !GST_REGEX.test(gstNumber)) {
      return res.status(400).json({ message: "Invalid GST number format." });
    }

    if (cinNumber && !CIN_REGEX.test(cinNumber)) {
      return res.status(400).json({ message: "Invalid CIN number format." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered. Please sign in instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      gstNumber,
      cinNumber,
      employeeCount,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful.",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default signup;
