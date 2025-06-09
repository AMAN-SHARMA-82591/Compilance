import React, { useState } from "react";
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
    marginBottom: "16px",
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

function Register({ classes }) {
  const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const { name, email, password } = textInput;
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
      setError(true);
      return;
    }
    if (!name || !email || !password) {
      alert("Name, Email & Password is REQUIRED!");
      return;
    }
    setLoading(true);
    await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(async (resp) => {
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.message || "login failed");
        }
        return data;
      })
      .then(async (response) => {
        toastSuccess("New user registered.");
        localStorage.setItem("token", `Bearer ${response.token}`);
        await navigate("/organization");
        window.location.reload();
        setLoading(false);
        setTextInput({ name: "", email: "", password: "" });
      })
      .catch((error) => {
        const { message } = handleApiError(error);
        return toastError(message);
      })
      .finally(() => setLoading(false));
  }

  function handleNameInputChange(event) {
    setTextInput({
      ...textInput,
      name: event.target.value,
    });
  }

  function handleEmailInputChange(event) {
    if (!event.target.value) {
      setError(false);
    }
    setTextInput({
      ...textInput,
      email: event.target.value,
    });
  }

  function handlePasswordInputChange(event) {
    setTextInput({
      ...textInput,
      password: event.target.value,
    });
  }

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.paper }} variant="outlined" elevation={6}>
        <form className={classes.container} onSubmit={handleRegisterSubmit}>
          <Typography variant="h4" className={classes.typography}>
            Register
          </Typography>
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            value={textInput.name}
            onChange={handleNameInputChange}
            style={{ marginBottom: "10px" }}
            classes={{ root: classes.textField }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            error={Boolean(error)}
            value={textInput.email}
            style={{ marginBottom: "10px" }}
            onChange={handleEmailInputChange}
            classes={{ root: classes.textField }}
            helperText={
              Boolean(error)
                ? "Email is incorrect, example: abc1@gmail.com"
                : ""
            }
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            value={textInput.password}
            style={{ marginBottom: "10px" }}
            classes={{ root: classes.textField }}
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
              "Register"
            )}
          </Button>
          <Link to="/login" className={classes.registerButton}>
            Log In
          </Link>
        </form>
        <div className={classes.loginImage}>
          <img
            src={modernImage}
            className={classes.image}
            alt="register-illustration"
          />
        </div>
      </Paper>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(Register);
