const { Router } = require('express');
const playerRouter = require('./player');
const userRouter = require('./user');

const router = new Router();

router.use('/api', playerRouter);
router.use('/api', userRouter);

router.post('/api/login', (req, res) => {});

module.exports = router;
