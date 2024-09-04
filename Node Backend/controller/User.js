require('dotenv').config();
const User = require('../model/Authentication');
const Profile = require('../model/Profile');

const users = async (req, res) => {
    try {
        const profiles = await User.find().select('name email').exec();
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const profile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.user.profile._id });
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const getProfile = async (req, res) => {
    try {
        const { params: { id } } = req;

        const profileData = await Profile.findById({ _id: id });
        if (!profileData) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).json(profileData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const profileList = async (req, res) => {
    try {
        const profileList = await Profile.find();
        if (!profileList) {
            return res.status(400).json({ msg: 'There is no profile List.' });
        }
        setTimeout(() => {
            return res.status(200).json(profileList);
        }, 1000);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const createProfile = async (req, res) => {
    const { name, email, ...entity } = req.body;
    if (!req.body.email || !req.body.name) {
        res.status(400).send('Fields Required');
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User already exists.' });
        }
        // user = new User({
        //     name,
        //     email,
        //     password: 
        // })
        const username = email.match(/^[^@]+/)[0];
        console.log('CreateUser', name, email, username);
        res.status(200).send('Working!!');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

const updateProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            id,
            req.body,
        )
        if (!updatedProfile) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'Profile has been updated.', data: updatedProfile })
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateProfileImage = async (req, res) => {
    const id = req.params.id;
    try {
        await Profile.findByIdAndUpdate(
            { _id: id },
            { image: req.body.image },
        );
        res.status(200).json({ message: 'Image is uploaded', image: req.body.image });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    users,
    profile,
    profileList,
    getProfile,
    updateProfile,
    createProfile,
    updateProfileImage,
};