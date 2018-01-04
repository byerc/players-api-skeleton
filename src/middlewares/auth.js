const jwt = require('express-jwt');

const secret = process.env.JWT_SECRET || 'secret';

const options = {
  secret,
};

module.exports = jwt(options).unless({ path: ['/api/user', '/api/login'] });
