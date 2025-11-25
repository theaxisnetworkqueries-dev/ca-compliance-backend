import Task from "../../models/task.model.js";
import CalendarEvent from "../../models/calendar.model.js";

export const generateGSTDate = async (req, res) => {
  try {
    const { dueDate, userId } = req.body;

    const parsedDue = new Date(dueDate);

    const reminderDate = new Date(parsedDue);
    reminderDate.setDate(reminderDate.getDate() - 3);

    const event = await CalendarEvent.create({
      userId,
      dueDate: parsedDue,
      reminderDate,
    });

    // automatic task creation
    await Task.create({
      userId,
      title: "GST Filing Reminder",
      description: `GST filing due on ${parsedDue.toDateString()}. Start preparing documents.`,
      dueDate: reminderDate,
    });

    return res.status(201).json({
      message: "GST reminder + task created successfully.",
      event,
    });
  } catch (error) {
    console.error("GST generate error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
