import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Link, withRouter, useHistory } from 'react-router-dom';
import {
    Button,
    FormControl,
    Paper,
    TextField,
    InputBase,
    Typography,
    Grid,
} from '@mui/material';

const styles = () => ({
    container: {
        textAlign: 'center',
        maxWidth: '100%',
        margin: '180px auto 0px auto',
        width: 550,
        padding: '80px',
    },
    typography: {
        color: 'white',
    },
    input: {
        color: 'white',
    },
});

function Login({ classes, history }) {
    const [textInput, setTextInput] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    async function handleLoginSubmit() {
        if (!(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(textInput.email)) {
            setError({ email: true, password: false });
        }
        if (!textInput.email || !textInput.password) {
            alert('Email & Password is REQUIRED!')
        }
        try {
            const res = await fetch('/compilance/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: textInput.email, password: textInput.password }),
            }).then(resp => resp.json());
            localStorage.setItem('token', res.token);
            history.push('/dashboard');
            setTextInput({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
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
        <div>
            <Paper classes={{ root: classes.container }} sx={{ backgroundColor: '#1f2842' }} elevation={4} variant='outlined'>
                <Grid container={true} spacing={3}>
                    <Grid item={true} xs={12}>
                        <Typography variant='h2' className={classes.typography}>
                            Login Form
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className={classes.typography} variant='h5'>
                            Email
                        </Typography>
                        <TextField
                            variant='outlined'
                            error={Boolean(error)}
                            helperText={Boolean(error) ? 'Email is incorrect, example: abc1@gmail.com' : ''}
                            className={classes.textField}
                            value={textInput.email}
                            onChange={(e) => handleEmailInputChange(e)}
                            fullWidth={true}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className={classes.typography} variant='h5'>
                            Password
                        </Typography>
                        <TextField
                            variant='outlined'
                            type='password'
                            className={classes.textField}
                            value={textInput.password}
                            onChange={(e) => handlePasswordInputChange(e)}
                            fullWidth={true}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ height: '50px' }}
                            color="primary"
                            fullWidth={true}
                            onClick={() => handleLoginSubmit()}
                        >
                            Submit
                        </Button>
                        <Button
                            component={Link}
                            color="primary"
                            style={{ height: '50px', marginTop: 20 }}
                            to='/register'
                        >
                            Register A New User
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

Login.propTypes = {
    history: PropTypes.object,
    classes: PropTypes.object,
};

export default compose(withStyles(styles), withRouter)(Login)