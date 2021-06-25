const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret = 'senhadificil';
const createToken = ({ displayName, email, password, image }) => {
  const token = jwt.sign({ displayName, email, password, image }, secret, jwtConfig);

  return token;
}

module.exports = createToken;