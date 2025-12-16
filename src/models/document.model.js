import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  filename: String,
  url: String,
  size: Number,
  mimeType: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Document", documentSchema);
