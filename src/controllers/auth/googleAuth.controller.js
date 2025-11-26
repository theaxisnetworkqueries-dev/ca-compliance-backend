import admin from "../../config/firebase.js";
import User from "../../models/user.model.js";

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required." });
    }

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture, uid } = decoded;

    let user = await User.findOne({ email });

    // First-time login → create user
    if (!user) {
      user = await User.create({
        email,
        name: name || "",
        avatar: picture || "",
        googleId: uid,
        password: null,
        googleSignIn: true,
      });
    }

    return res.status(200).json({
      message: "Google login successful",
      user,
    });
  } catch (error) {
    console.error("🔥 Google Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired Google token" });
  }
};
