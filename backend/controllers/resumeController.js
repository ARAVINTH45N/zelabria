const path = require("path");

// (Optional) If you later create a Resume model, import here
// const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    // Debug log (keep for now)
    console.log("📄 Uploaded file:", req.file);

    // 1. Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded or invalid file type (only PDF allowed)",
      });
    }

    // 2. File details
    const fileName = req.file.filename;
    const filePath = req.file.path;
    const fileSize = req.file.size;

    // 3. OPTIONAL — Save to DB (enable later)
    /*
    const savedResume = await Resume.create({
      user: req.user?.id || null,
      fileName,
      filePath,
      fileSize,
    });
    */

    // 4. Response
    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        fileName,
        filePath,
        fileSize,
        fileUrl: `http://localhost:5000/${filePath.replace(/\\/g, "/")}`,
      },
    });
  } catch (error) {
    console.error("❌ Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during file upload",
    });
  }
};