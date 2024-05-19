const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const stockRouter = require('./stock');

router.use('/', [authRouter, stockRouter]);

module.exports = router;
