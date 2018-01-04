const jwt = require('express-jwt');
const { sign } = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const options = {
  secret,
};

function signToken(userId) {
  return sign({ userId, permissions: 'admin' }, secret);
}

module.exports = { jwt: jwt(options).unless({ path: ['/api/user', '/api/login'] }), signToken };
