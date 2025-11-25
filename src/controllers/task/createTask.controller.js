import Task from "../../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { userId, title, description, dueDate } = req.body;

    if (!userId || !title || !dueDate) {
      return res
        .status(400)
        .json({ message: "userId, title and dueDate are required." });
    }

    const newTask = await Task.create({
      userId,
      title,
      description,
      dueDate,
    });

    res.status(201).json({
      message: "Task created successfully.",
      task: newTask,
    });
  } catch (err) {
    console.error("Task creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
