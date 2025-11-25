import express from "express";
import { createTask } from "../../controllers/task/createTask.controller.js";
import { getTasksByUser } from "../../controllers/task/getTasks.controller.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/:userId", getTasksByUser);

export default router;
