async function getLinkedInAccessToken(code, redirectUri) {
  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: `${redirectUri}/oauth-success?provider=linkedin`,
    });
    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const accessToken = await response.json();
    return accessToken;
  } catch (error) {
    throw error;
  }
}

async function getLinkedInUserData(token) {
  try {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
}

module.exports = { getLinkedInAccessToken, getLinkedInUserData };
