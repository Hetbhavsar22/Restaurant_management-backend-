const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
  },
  category: {
    type: String,
    enum: ['starter', 'main_course', 'dessert', 'beverage'],
    required: [true, 'Menu category is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  dietaryTags: [
    {
      type: String,
      enum: ['vegetarian', 'vegan', 'gluten-free', 'nut-free'],
    },
  ],
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
