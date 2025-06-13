// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../controllers/userController");

const { verifyToken, restrictTo } = require("../middleware/authMiddleware");

router.post("/", verifyToken, restrictTo("owner", "manager"), createStaff);
router.get("/", verifyToken, restrictTo("owner", "manager"), getAllStaff);
router.get("/:id", verifyToken, restrictTo("owner", "manager"), getStaffById);
router.put("/:id", verifyToken, restrictTo("owner", "manager"), updateStaff);
router.delete("/:id", verifyToken, restrictTo("owner", "manager"), deleteStaff);

module.exports = router;
