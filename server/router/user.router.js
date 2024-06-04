const express = require('express');
const router = express.Router();
const { createUser ,createDocument,getDocuments,getDocumentData,updateDocumentData} = require('../controller/user.controller'); // Adjust the path as needed

// Define routes
router.post('/createUser', createUser);

router.post('/createDocument', createDocument);

router.get('/getDocuments/:firebaseuid', getDocuments);

router.get('/getDocumentData/:id', getDocumentData);

router.put('/updateDocumentData/:id', updateDocumentData);


module.exports = router;
