const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const createToken = (result) => {
  const token = jwt.sign(result, secret, jwtConfig);

  return token;
};

module.exports = createToken;