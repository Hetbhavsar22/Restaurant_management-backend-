const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const upload = require('../middleware/uploadMiddleware');

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItem);
router.post('/', protect, restrictTo('owner', 'manager'), upload.single('image'), menuController.createMenuItem);
router.put('/:id', protect, restrictTo('owner', 'manager'), upload.single('image'), menuController.updateMenuItem);
router.delete('/:id', protect, restrictTo('owner'), menuController.deleteMenuItem);
  
  module.exports = router;