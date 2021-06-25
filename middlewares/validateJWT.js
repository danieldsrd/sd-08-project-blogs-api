const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret = 'senhadificil';
const createToken = (result) => {
  const token = jwt.sign(result, secret, jwtConfig);

  return token;
};

module.exports = createToken;