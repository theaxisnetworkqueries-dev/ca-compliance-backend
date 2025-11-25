import express from "express";
import { generateGSTDate } from "../../controllers/calendar/generateGSTDate.controller.js";
const router = express.Router();

router.post("/generate-gst", generateGSTDate);

export default router;
