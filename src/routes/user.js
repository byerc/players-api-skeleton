const { Router } = require('express');
const bcrypt = require('bcrypt');
const { signToken } = require('../auth/auth');
const User = require('../models/user');
const { validateUser, validateLogin } = require('../middlewares/validate');
const router = new Router();

router.post('/user', validateUser, async (req, res) => {
  const password = req.body.password;
  // Set plaintext password to hash before storing
  req.body.password = await bcrypt.hash(password, 10);
  let user;
  try {
    user = await User.create(req.body);
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
  }
  // Issue token
  const token = signToken(user.id);
  res.status(201).json({ success: true, user, token });
});

router.post('/login', validateLogin, async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;
  // Check if user exists
  const user = await User.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false });
  }
  const hash = user.password;
  // Compare plaintext password with stored hash
  const isValidPassword = await bcrypt.compare(textPassword, hash);
  if (!isValidPassword) {
    return res.status(401).json({ success: false });
  }
  // Issue token
  const token = signToken(user.id);
  // Remove password for response
  delete user.password;
  res.status(200).json({ success: true, user, token });
});

module.exports = router;
