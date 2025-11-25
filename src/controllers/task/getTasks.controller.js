import Task from "../../models/task.model.js";

export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
