module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  } else {
      res.status(401).json({ message: 'You are not logged in yet' });
  }
};
