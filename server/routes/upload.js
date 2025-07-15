const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const upload = require("../middleware/upload"); 


router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
