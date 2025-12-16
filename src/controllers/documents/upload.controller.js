import { supabase } from "../../config/supabase.js";
import Document from "../../models/document.model.js";

export const uploadDocument = async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filename = `${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Upload failed" });
    }

    // Generate signed URL for access
    const { data: signed } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .createSignedUrl(filename, 60 * 60 * 24); // 24 hours

    // Save metadata
    const doc = await Document.create({
      userId,
      filename,
      url: signed.signedUrl,
      size: file.size,
      mimeType: file.mimetype,
    });

    return res.status(201).json({
      message: "Upload successful",
      document: doc,
    });
  } catch (err) {
    console.error("Document upload error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
