async function getGithubAccessToken(code) {
  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );
    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

async function getGithubUserData(tokenData) {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData}`,
      },
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
}

async function getGithubEmailData(tokenData) {
  try {
    const response = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokenData}`,
        Accept: "application/vnd.github+json",
      },
    });
    const emailData = await response.json();
    if (!Array.isArray(emailData)) {
      throw new Error("Github email API did not return an array.");
    }
    const verifiedEmail =
      emailData.find((e) => e.primary && e.verified)?.email ||
      emailData[0]?.email;
    return verifiedEmail;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGithubUserData,
  getGithubEmailData,
  getGithubAccessToken,
};
