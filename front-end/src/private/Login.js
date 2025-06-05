import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import modernImage from "../images/vecteezy_modern-abstract-background-illustration_34720880.jpg";
import { toastError, toastSuccess } from "./Common/ToastContainer";

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
    flexDirection: "column",
    justifyContent: "center",
    padding: "48px 32px",
    background: "#fff",
  },
  typography: {
    color: "#1976d2",
    fontWeight: 700,
    marginBottom: "16px",
    textAlign: "center",
    padding: "20px 0px",
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
  const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
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
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: textInput.email,
        password: textInput.password,
      }),
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(error));
    if (res && res.token) {
      toastSuccess("Login Successful");
      localStorage.setItem("token", `Bearer ${res.token}`);
      await navigate("/home");
      window.location.reload();
      setTextInput({ email: "", password: "" });
    } else {
      toastError("Invalid Credentials");
    }
    setLoading(false);
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
