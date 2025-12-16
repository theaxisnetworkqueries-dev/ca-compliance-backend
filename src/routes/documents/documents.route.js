import express from "express";
import { uploadDocument } from "../../controllers/documents/upload.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);

export default router;
