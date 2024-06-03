const express = require('express');
const router = express.Router();
const { createUser ,createDocument} = require('../controller/user.controller'); // Adjust the path as needed

// Define routes
router.post('/createUser', createUser);

router.post('/createDocument', createDocument);

module.exports = router;
