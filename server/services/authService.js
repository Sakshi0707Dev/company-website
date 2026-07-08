const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signToken = (adminId) => {
  return jwt.sign({ id: adminId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = () => {
  return {
    expires: new Date(
      Date.now() + parseInt(env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
  };
};

module.exports = { signToken, cookieOptions };
