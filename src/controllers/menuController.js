const fs = require('fs');
const path = require('path');
const MenuItem = require('../models/MenuItem');

exports.createMenuItem = async (req, res) => {
    try {
      const { name, description, price, category, isAvailable, dietaryTags } = req.body;
  
      if (!name || !price || !category) {
        return res.status(400).json({
          success: false,
          message: 'Name, price, and category are required.',
        });
      }
  
      const imageUrl = req.file ? `/uploads/menu/${req.file.filename}` : null;
  
      const menuItem = await MenuItem.create({
        name,
        description,
        price,
        category,
        isAvailable: isAvailable === 'true' || isAvailable === true,
        dietaryTags: Array.isArray(dietaryTags)
          ? dietaryTags
          : typeof dietaryTags === 'string'
          ? dietaryTags.split(',').map((t) => t.trim())
          : [],
        imageUrl,
      });
  
      res.status(201).json({ success: true, data: menuItem });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // @desc    Get all menu items
  exports.getAllMenuItems = async (req, res) => {
    try {
      const items = await MenuItem.find();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // @desc    Get single menu item
  exports.getMenuItem = async (req, res) => {
    try {
      const item = await MenuItem.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // @desc    Update menu item
  exports.updateMenuItem = async (req, res) => {
    try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
  
      const {
        name,
        description,
        price,
        category,
        isAvailable,
        dietaryTags,
      } = req.body;
  
      // Update basic fields if provided
      if (name) menuItem.name = name;
      if (description) menuItem.description = description;
      if (price) menuItem.price = price;
      if (category) menuItem.category = category;
      if (typeof isAvailable !== 'undefined') {
        menuItem.isAvailable = isAvailable === 'true' || isAvailable === true;
      }
  
      if (dietaryTags) {
        menuItem.dietaryTags = Array.isArray(dietaryTags)
          ? dietaryTags
          : typeof dietaryTags === 'string'
          ? dietaryTags.split(',').map(tag => tag.trim())
          : [];
      }
  
      // Handle image replacement
      if (req.file) {
        // Delete old image file if it exists
        if (menuItem.imageUrl) {
          const oldPath = path.join(__dirname, '../../public', menuItem.imageUrl);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
  
        menuItem.imageUrl = `/uploads/menu/${req.file.filename}`;
      }
  
      const updatedItem = await menuItem.save();
  
      res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // @desc    Delete menu item
  exports.deleteMenuItem = async (req, res) => {
    try {
      const deleted = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };