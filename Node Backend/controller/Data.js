require('dotenv').config();

const data = async(req, res) => {
    console.log('running');
    res.status(200).send('Data is working');
};

module.exports = data;