const express = require('express');
const router = express.Router();


const users = require('../controllers/users');

router.post('/api/users/signup', users.createUser);
router.post('/api/users/signin', users.signinUsers);
router.get('/api/users/:id', users.getUserData);

module.exports = router;