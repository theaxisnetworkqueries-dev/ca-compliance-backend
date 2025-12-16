import Task from "../../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    // 1. Destructure 'name' (matching frontend), not 'title'
    // 2. Allow company/assignedTo to be passed in, or default to placeholders
    const {
      userId,
      name, // Changed from 'title' to 'name'
      description,
      dueDate,
      company,
      assignedTo,
      priority,
      status,
    } = req.body;

    // Validate 'name' now, not 'title'
    if (!userId || !name || !dueDate) {
      return res
        .status(400)
        .json({ message: "userId, name (title), and dueDate are required." });
    }

    // 3. Create using the logic: Use provided value OR fallback to placeholder
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
