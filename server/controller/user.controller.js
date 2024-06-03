const mongoose = require('mongoose');
const User = require('../models/user.models.js');
const Document= require('../models/document.models.js')
const createUser = async (req, res) => {
    try {
        const userReq = req.body;
        const user = await User.findOne({ email: userReq.email }); // Use findOne to find a single document
        if (user) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const newUser = await User.create(userReq);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user.' });
    }
};

const createDocument = async (req,res)=>{
    try {
        const documentReq = req.body;
        const document = await Document.findOne({ name: documentReq.name }); // Use findOne to find a single document
        if (document) {
            return res.status(400).json({ error: 'Document already exists.' });
        }
        const newDocument = await Document.create(documentReq);

        const user = await User.findOne({ firebaseuid: documentReq.firebaseuid }); 
        user.documents.push(newDocument._id);
        await user.save();


        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create document.' });
    }
}

module.exports = {
    createUser,
};
