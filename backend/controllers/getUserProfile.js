// controllers/getUserProfile.js
const User = require('../models/User');

// @desc    Get user profile data
// @route   GET /api/v1/users/profile
// @access  Protected
exports.getUserProfile = async (req, res) => {
  // req.user is attached by the 'protect' middleware
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};