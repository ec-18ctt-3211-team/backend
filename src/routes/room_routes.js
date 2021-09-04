const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/`);
  },
  filename: (req, file, cb) => {
    if (!req.filenames) req.filenames = [];
    const newName = `${new Date().toISOString()}_${file.originalname}`;
    req.filenames.push(newName);
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

module.exports = ({ roomController, authentication }) => {
  const router = express.Router();
  router.get("/", roomController.index);
  router.get("/:id", roomController.show);
  router.get("/host/:id", roomController.host);
  router.post("/", authentication.verify, roomController.create);
  router.put("/:id", authentication.verify, roomController.update);
  router.delete("/:id", authentication.verify, roomController.delete);
  return router;
};
