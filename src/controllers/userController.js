const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create staff
exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role, phone });
    await user.save();

    res.status(201).json({ message: "Staff created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "owner" } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single staff
exports.getStaffById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Staff updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Staff deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
