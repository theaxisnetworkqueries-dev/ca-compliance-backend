import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: { type: Date, required: true },
    reminderDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const CalendarEvent = mongoose.model("CalendarEvent", calendarSchema);
export default CalendarEvent;
