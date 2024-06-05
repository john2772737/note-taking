const express = require('express');
const router = express.Router();
const { createUser ,createDocument,getDocuments,getDocumentData,updateDocumentData,getUser,deleteDocument,checkDocumentUser,checkDocumentexist} = require('../controller/user.controller'); // Adjust the path as needed

// Define routes
router.post('/createUser', createUser);

router.post('/createDocument', createDocument);

router.get('/getDocuments/:firebaseuid', getDocuments);

router.get('/getDocumentData/:id', getDocumentData);

router.put('/updateDocumentData/:id', updateDocumentData);

router.get('/getUser/:firebaseuid', getUser);

router.delete('/delete/:documentId', deleteDocument);

router.get('/checkDocumentUser/:documentId', checkDocumentUser);

router.get('/checkDocumentexist/:documentId', checkDocumentexist);


module.exports = router;
