import express from "express";
import signin from "../../controllers/auth/signin_controller.js";
import signup from "../../controllers/auth/signup_controller.js";

const router = express.Router();

// Registration Route
router.post("/sign-up", signup); // from the signin controller

// Sign-In Route
router.post("/sign-in", signin); // from the signup controller

export default router;
