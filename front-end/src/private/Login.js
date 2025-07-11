import { useState } from "react";
import * as PropTypes from "prop-types";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Link, useNavigate } from "react-router";
import {
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import modernImage from "../images/vecteezy_modern-abstract-background-illustration_34720880.jpg";
import { toastError, toastSuccess } from "./Common/ToastContainer";
import { handleApiError } from "./Common/ErrorHandler";
import OAuthHandler from "./Common/OAuthHandler";

const styles = () => ({
  root: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(120deg, #1976d2 60%, #fff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "800px",
    minHeight: "480px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    borderRadius: "18px",
    overflow: "hidden",
    background: "#fff",
  },
  container: {
    flex: 1,
    display: "flex",
    background: "#fff",
    padding: "35px 32px",
    flexDirection: "column",
    justifyContent: "center",
  },
  typography: {
    color: "#1976d2",
    fontWeight: 700,
    marginBottom: "10px",
    textAlign: "center",
    padding: "5px 0px",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1976d2",
      },
      "&:hover fieldset": {
        borderColor: "#1565c0",
      },
    },
  },
  loginImage: {
    flex: 1,
    background: "#1976d2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  button: {
    height: "50px",
    margin: "16px 0",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "1px",
  },
  registerButton: {
    marginTop: "12px",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "1px",
    color: "#1976d2",
    border: "none",
    textAlign: "center",
    textDecoration: "none",
  },
});

function Login({ classes }) {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(textInput.email)) {
      setError(true);
    }
    if (!textInput.email || !textInput.password) {
      return toastError("Email & Password is REQUIRED!");
    }
    setLoading(true);
    await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: textInput.email,
        password: textInput.password,
      }),
    })
      .then(async (resp) => {
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.message || "login failed");
        }
        return data;
      })
      .then(async (response) => {
        toastSuccess("Login Successful");
        localStorage.setItem("uid", response.uid);
        await navigate("/home");
        window.location.reload();
        setTextInput({ email: "", password: "" });
      })
      .catch((error) => {
        const { message } = handleApiError(error);
        return toastError(message);
      })
      .finally(() => setLoading(false));
  }

  function handleEmailInputChange(event) {
    if (!event.target.value) {
      setError(false);
    }
    setTextInput({ email: event.target.value, password: textInput.password });
  }

  function handlePasswordInputChange(event) {
    setTextInput({ email: textInput.email, password: event.target.value });
  }
  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.paper }} elevation={6} variant="outlined">
        <OAuthHandler />
        <form className={classes.container} onSubmit={handleLoginSubmit}>
          <Typography variant="h4" className={classes.typography}>
            Login
          </Typography>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            error={Boolean(error)}
            value={textInput.email}
            className={classes.textField}
            style={{ marginBottom: "10px" }}
            onChange={handleEmailInputChange}
            helperText={
              Boolean(error)
                ? "Email is incorrect, example: abc1@gmail.com"
                : ""
            }
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={textInput.password}
            className={classes.textField}
            style={{ marginBottom: "10px" }}
            onChange={handlePasswordInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          <Link to="/register" className={classes.registerButton}>
            Register A New User
          </Link>
        </form>
        <div className={classes.loginImage}>
          <img
            src={modernImage}
            className={classes.image}
            alt="login-illustration"
          />
        </div>
      </Paper>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(Login);
