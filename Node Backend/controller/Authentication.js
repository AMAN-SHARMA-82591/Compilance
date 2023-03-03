
const login = (req, res) => {
    res.status(200).send('Login User');
}

const register = (req, res) => {
    res.status(200).send('Register User');
}

module.exports = {
    login,
    register,
};