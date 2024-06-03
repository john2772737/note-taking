const mongoose = require('mongoose');

const createUser = (req, res) => {
    const user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'User created successfully', user: savedUser });
        }
    });
};

module.exports={
    createUser,
}