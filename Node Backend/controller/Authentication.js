require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/Authentication');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Fields Required!');
    }
    const user = await User.findOne({ email });
    //compare password
    if (!user) {
        res.status(400).send('User Not Found.');
    }
    // const isPasswordCorrect = await user.comparePassword(password);
    // if (!isPasswordCorrect) {
    //     res.status(400).send('Password Is Incorrect.');
    // }
    const token = jwt.sign(
        {
            userId: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
    )
    res.status(201).json({ token });
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).send('Fields Required!');
    }
    const user = await User.create(req.body);
    const token = jwt.sign(
        {
            userId: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
    )
    res.status(201).json({ token });
}

module.exports = {
    login,
    register,
};