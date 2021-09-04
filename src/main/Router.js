const express = require("express");
const cors = require("cors");

module.exports = ({
  authRoutes,
  customerRoutes,
  discountRoutes,
  roomRoutes,
  orderRoutes,
  cityRoutes,
}) => {
  const router = express.Router();
  router.use(express.static("public"));
  router.use(cors({ exposedHeaders: "auth-token" }));
  router.use(express.json({ limit: "5mb" }));
  router.use(express.urlencoded({ limit: "5mb", extended: true }));

  router.use("/auth", authRoutes);
  router.use("/rooms", roomRoutes);
  router.use("/customer", customerRoutes);
  router.use("/discount", discountRoutes);
  router.use("/order", orderRoutes);
  router.use("/city", cityRoutes);
  return router;
};