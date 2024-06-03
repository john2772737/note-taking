const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/user.controller'); // Adjust the path as needed

// Define routes
router.post('/createUser', createUser);

module.exports = router;
