const authAdminRole = [1, 2];
const expiryInSeconds = 60 * 60 * 24;

const tempPassword = (email) => email.match(/^[^@]+/)[0];

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

module.exports = {
  tempPassword,
  authAdminRole,
  allowedOrigins,
  expiryInSeconds,
};
