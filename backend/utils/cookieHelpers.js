const { expiryInSeconds } = require("../utils/constants");

function setAuthCookie(res, user) {
  const cookiePayload = JSON.stringify({
    ...user,
    expiry: Math.round(Date.now() / 1000 + expiryInSeconds),
  });
  res.cookie("token", Buffer.from(cookiePayload).toString("base64url"), {
    httpOnly: true,
    signed: true,
    maxAge: expiryInSeconds * 1000, // in milliseconds
    sameSite: "None",
    secure: true,
  });
}

module.exports = { setAuthCookie };
