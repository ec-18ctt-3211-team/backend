const express = require("express");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/`);
  },
  filename: (req, file, cb) => {
    if (!req.filenames) req.filenames = []
    const newName = `${new Date().toISOString()}_${file.originalname}`
    req.filenames.push(newName)
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

module.exports = ({ roomController }) => {
  const router = express.Router();
  router.get("/", roomController.index);
  router.get("/:id", roomController.show);
  router.get("/host/:id", roomController.host);
  router.post(
    "/",
    upload.any(),
    roomController.create
  );
  return router;
};

// upload.fields([
//   { name: "img_1", maxCount: 1 },
//   { name: "img_2", maxCount: 1 },
//   { name: "img_3", maxCount: 1 },
//   { name: "img_4", maxCount: 1 },
// ])
