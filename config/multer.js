const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🔧 Helper: Create folder if not exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// --- Storage config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    // نوع الملف يحدد مكانه
    if (file.fieldname === "profilePic") {
      const userId = req.body.userId || "unknown";
      uploadPath = path.join("uploads", "profiles", `user_${userId}`);
    } else if (file.fieldname === "document") {
      const studentId = req.body.studentId || "unknown";
      uploadPath = path.join(
        "uploads",
        "students",
        `student_${studentId}`,
        "documents"
      );
    } else {
      return cb(new Error("Invalid upload field"));
    }

    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// --- File filter ---
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  // 🖼️ Profile pics
  if (file.fieldname === "profilePic") {
    if (
      (ext === ".jpg" || ext === ".png") &&
      (mime === "image/jpeg" || mime === "image/png")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG or PNG allowed for profile pictures"), false);
    }
  }

  // 📄 Documents
  else if (file.fieldname === "document") {
    if (
      [".pdf", ".jpg", ".png"].includes(ext) &&
      ["application/pdf", "image/jpeg", "image/png"].includes(mime)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, or PNG allowed for documents"), false);
    }
  } else {
    cb(new Error("Invalid field name"), false);
  }
};

// --- Limits based on field name ---
const limits = {
  fileSize: 5 * 1024 * 1024, // default 5 MB
};

// --- Final multer instance ---
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
