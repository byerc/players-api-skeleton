const { Router } = require('express');
const Player = require('../models/player');
const { validatePlayer } = require('../middlewares/validate');

const router = new Router();

router.get('/players', (req, res) => {});

router.post('/players', validatePlayer, (req, res) => {});

router.post('/players/:id', (req, res) => {});

module.exports = router;
