// controllers/updateProfile.js
const User = require('../models/User');

// @desc    Update user profile data
// @route   PUT /api/v1/users/profile
// @access  Protected
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update simple fields, using current value if not provided in request
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Handle password update separately
    if (req.body.password) {
      user.password = req.body.password; // The pre-save middleware in User.js handles hashing
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      message: 'Profile updated successfully',
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};