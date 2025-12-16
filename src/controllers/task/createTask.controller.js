import Task from "../../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const {
      userId,
      name, 
      description,
      dueDate,
      company,
      assignedTo,
      priority,
      status,
    } = req.body;

    if (!userId || !name || !dueDate) {
      return res
        .status(400)
        .json({ message: "userId, name (title), and dueDate are required." });
    }

    const newTask = await Task.create({
      userId,
      name,
      description: description || "",
      company: company || "placeholder company", // Fallback if empty
      assignedTo: assignedTo || "placeholder assigned", // Fallback if empty
      priority: priority || "Medium",
      status: status || "Not Started",
      dueDate,
    });

    res.status(201).json({
      message: "Task created successfully.",
      task: newTask, // Send back the actual DB object
    });
  } catch (err) {
    console.error("Task creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
