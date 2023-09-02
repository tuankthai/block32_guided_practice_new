const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/dogs
router.use('/dogs', require('./dogs'));

// ROUTER: /api/cats
router.use('/cats', require('./cats'));

module.exports = router;