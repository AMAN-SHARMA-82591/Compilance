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
import Grid from "@mui/material/Grid2";
import { toastSuccess } from "./Common/ToastContainer";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1f2842",
  },
  paper: {
    padding: "50px",
    width: "100%",
    maxWidth: "500px",
  },
  container: {
    textAlign: "center",
    width: "100%",
  },
  typography: {
    color: "#1976d3",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(14, 13, 13, 0.41)",
      },
      "&:hover fieldset": {
        borderColor: "#1976d3",
      },
    },
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

  async function handleRegisterSubmit() {
    const { name, email, password } = textInput;
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(textInput.email)) {
      setError(true);
    }
    if (!textInput.email || !textInput.password || !textInput.name) {
      alert("Name, Email & Password is REQUIRED!");
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((resp) => resp.json())
        .catch((error) => console.error(error));
      if (res && res.token) {
        toastSuccess("New user registered.");
        localStorage.setItem("token", `Bearer ${res.token}`);
        await navigate("/organization");
        window.location.reload();
        setLoading(false);
        setTextInput({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleNameInputChange(event) {
    setTextInput({
      name: event.target.value,
      email: textInput.email,
      password: textInput.password,
    });
  }

  function handleEmailInputChange(event) {
    if (!event.target.value) {
      setError(false);
    }
    setTextInput({
      name: textInput.name,
      email: event.target.value,
      password: textInput.password,
    });
  }

  function handlePasswordInputChange(event) {
    setTextInput({
      name: textInput.name,
      email: textInput.email,
      password: event.target.value,
    });
  }

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.paper }} variant="outlined" elevation={2}>
        <form className={classes.container} onSubmit={handleRegisterSubmit}>
          <Grid container={true} spacing={3}>
            <Grid item={true} size={12}>
              <Typography variant="h2" className={classes.typography}>
                Register Form
              </Typography>
            </Grid>
            <Grid item={true} size={12}>
              <Typography className={classes.typography} variant="h5">
                Name
              </Typography>
              <TextField
                name="name"
                variant="outlined"
                className={classes.textField}
                value={textInput.name}
                onChange={(e) => handleNameInputChange(e)}
                fullWidth={true}
              />
            </Grid>
            <Grid item={true} size={12}>
              <Typography className={classes.typography} variant="h5">
                Email
              </Typography>
              <TextField
                name="email"
                variant="outlined"
                error={Boolean(error)}
                helperText={
                  Boolean(error)
                    ? "Email is incorrect, example: abc1@gmail.com"
                    : ""
                }
                className={classes.textField}
                value={textInput.email}
                onChange={(e) => handleEmailInputChange(e)}
                fullWidth={true}
              />
            </Grid>
            <Grid item={true} size={12}>
              <Typography className={classes.typography} variant="h5">
                Password
              </Typography>
              <TextField
                name="password"
                variant="outlined"
                type="password"
                className={classes.textField}
                value={textInput.password}
                onChange={(e) => handlePasswordInputChange(e)}
                fullWidth={true}
              />
            </Grid>
            <Grid item={true} size={12} style={{ marginTop: 30 }}>
              <Button
                type="submit"
                variant="contained"
                style={{ height: "50px" }}
                color="primary"
                fullWidth={true}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                component={Link}
                color="primary"
                style={{ height: "50px", marginTop: 20 }}
                to="/login"
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(Register);
