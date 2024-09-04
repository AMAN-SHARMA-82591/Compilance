const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.profile.organization) {
            return res.status(401).json({ msg: 'Organization is not been created' });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}