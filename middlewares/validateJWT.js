const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'senhadificil';

const STATUS_ERROR = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS_ERROR).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
 return res.status(STATUS_ERROR).json(
      { message: 'User dont exists.' },
    ); 
}

    req.user = user;
    next();
  } catch (_err) {
    return res.status(STATUS_ERROR).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  validateJWT,
};