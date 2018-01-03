const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateUser } = require('../middlewares/validate');
const router = new Router();


router.post('/user', validateUser, async (req, res) => {
  const password = req.body.password;
  req.body.password = await bcrypt.hash(password, 10);
  const user = await User.create(req.body);
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign({ userId: user.id, permissions: 'admin' }, secret);
  res.json({ token, user });
});

module.exports = router;
