const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.post('/api/users', users.createUser);

module.exports = router;