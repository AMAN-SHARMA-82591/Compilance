require('dotenv').config();
const User = require('../model/Authentication');
const Profile = require('../model/Profile');

const users = async (req, res) => {
    try {
        const profiles = await User.find().select('name email').exec();
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const profile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.userId });
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    users,
    profile,
};