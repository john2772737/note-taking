const express = require('express');
const router = express.Router();
const { createUser ,createDocument,getDocuments,getDocumentData} = require('../controller/user.controller'); // Adjust the path as needed

// Define routes
router.post('/createUser', createUser);

router.post('/createDocument', createDocument);

router.get('/getDocuments/:firebaseuid', getDocuments);

router.get('/getDocumentData/getDocumentData/:id', getDocumentData);

module.exports = router;
