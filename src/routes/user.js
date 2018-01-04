const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateUser, validateLogin } = require('../middlewares/validate');
const router = new Router();

const secret = process.env.JWT_SECRET || 'secret';

router.post('/user', validateUser, async (req, res) => {
  const password = req.body.password;
  req.body.password = await bcrypt.hash(password, 10);
  let user;
  try {
    user = await User.create(req.body);
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
  }
  const token = jwt.sign({ userId: user.id, permissions: 'admin' }, secret);
  res.status(201).json({ success: true, user, token });
});

router.post('/login', validateLogin, async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;
  const user = await User.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false });
  }
  const hash = user.password;
  const isValidPassword = await bcrypt.compare(textPassword, hash);
  if (!isValidPassword) {
    return res.status(401).json({ success: false });
  }
  const token = jwt.sign({ userId: user.id, permissions: 'admin' }, secret);
  delete user.password;
  res.status(200).json({ success: true, user, token });
});

module.exports = router;
