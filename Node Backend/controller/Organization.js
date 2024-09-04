require('dotenv').config();
const Organization = require('../model/Organization');

const organizationList = async (req, res) => {
    try {
        res.status(200).json({ msg: 'complete List' });
    } catch (error) {
        console.error(error.message);
    }
}

const createOrganization = async (req, res) => {
    try {
        const organizationData = { ...req.body, user: req.user.profile.user }
        console.log('organization', organizationData);
        res.status(200).json({ msg: 'Create complete' });
    } catch (error) {
        console.error(error.message);
    }
}

const getOrganization = async (req, res) => {
    try {
        res.status(200).json({ msg: 'complete with Id' });
    } catch (error) {
        console.error(error.message);
    }
}

const editOrganization = async (req, res) => {
    try {
        res.status(200).json({ msg: 'Edit complete' });
    } catch (error) {
        console.error(error.message);
    }
}

const deleteOrganization = async (req, res) => {
    try {
        res.status(200).json({ msg: 'Delete complete' });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    organizationList,
    getOrganization,
    createOrganization,
    editOrganization,
    deleteOrganization,
}