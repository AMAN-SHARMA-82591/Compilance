require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/Authentication');
const Profile = require('../model/Profile');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Fields Required!');
    }
    try {
        const user = await User.findOne({ email });
        //compare password
        if (!user) {
            return res.status(400).json({ msg: 'User Not Found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                user: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
        )
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const userProfile = new Profile({
            user: user._id,
            skills: null,
            company: null,
            website: null,
            location: null,
            status: null,
            bio: null,
        });
        await userProfile.save();
        const token = jwt.sign(
            {
                userId: user._id,
                user: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
        )
        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
}

module.exports = {
    login,
    register,
};