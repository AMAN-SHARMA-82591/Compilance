import { compose } from "ramda";
import githubImage from "../..//images/github-mark.png";
import linkedInImage from "../../images/linkedin-logo.png";
import GoogleAuthLogin from "./GoogleAuthLogin";
import withStyles from "@mui/styles/withStyles";
import { IconButton } from "@mui/material";

const styles = () => ({
  authLogin: {
    bottom: "10px",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
  },
});

function OAuthHandler({ classes }) {
  const loginWithGitHub = () => {
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth-success?provider=github`,
      scope: "read:user user:email",
      prompt: "select_account",
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  const loginWithLinkedin = () => {
    const clientID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
    const redirectURI = `${window.location.origin}/oauth-success?provider=linkedin`;
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientID,
      redirect_uri: redirectURI,
      scope: "openid email profile",
    });
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  return (
    <div className={classes.authLogin}>
      <GoogleAuthLogin />
      <IconButton
        onClick={loginWithGitHub}
        sx={{
          margin: "0 3px 0 10px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <img
          style={{ width: 36, height: 36 }}
          src={githubImage}
          alt="github-login"
        />
      </IconButton>
      <IconButton
        onClick={loginWithLinkedin}
        sx={{
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <img
          style={{ width: 36, height: 36 }}
          src={linkedInImage}
          alt="linkedin-login"
        />
      </IconButton>
    </div>
  );
}

export default compose(withStyles(styles))(OAuthHandler);
