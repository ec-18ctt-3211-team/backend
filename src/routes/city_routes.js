const express = require("express");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/`);
  },
  filename: (req, file, cb) => {
    const newName = `${new Date().toISOString()}_${file.originalname}`
    req.filename = newName
    cb(null, newName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: fileFilter,
});

module.exports = ({ cityController }) => {
    const router = express.Router();
    router.post("/", upload.single("file"), cityController.create);
    router.get("/", cityController.index);
    router.get("/pinned", cityController.pinned);
    router.get("/:id", cityController.show);
    router.put("/:id", upload.single("file"), cityController.update);
    router.delete("/:id", cityController.delete);
    return router;
};
