
const isOrganizer = (req, res, next) => {

  if (req.user && req.user.role === 'organizer') {
    next(); 
  } else {
    res.status(403).json({ message: 'Not authorized as an Organizer' });
  }
};

module.exports = { isOrganizer };