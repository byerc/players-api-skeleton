const { Router } = require('express');
const Player = require('../models/player');
const { validatePlayer } = require('../middlewares/validate');

const router = new Router();

router.get('/players', async (req, res) => {
  const user = req.user;
  const players = await Player.find(user.userId);
  res.status(200).json({ success: true, players });
});

router.post('/players', validatePlayer, async (req, res) => {
  const user = req.user;
  const player = await Player.create({ ...req.body, created_by: user.userId });
  res.status(200).json({ success: true, player });
});

router.use('/players/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    await Player.remove(playerId);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
  res.status(200).json({ success: true });
});

module.exports = router;