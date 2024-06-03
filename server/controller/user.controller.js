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

  

module.exports = {
    createUser,
};
