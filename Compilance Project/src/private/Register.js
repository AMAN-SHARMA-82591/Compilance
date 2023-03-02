import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
    FormControl,
    Paper,
    TextField,
    InputBase,
    Typography,
    Grid,
} from '@material-ui/core';

const styles = () => ({
    container: {
        textAlign: 'center',
        maxWidth: '100%',
        margin: '180px auto 0px auto',
        backgroundColor: '#1f2842',
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

function Register({ classes }) {
    const [textInput, setTextInput] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(false);

    function handleLoginSubmit() {
        const { name, email, password } = textInput;
        if (!(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(textInput.email)) {
            setError(true);
        }
        if (!textInput.email || !textInput.password || !textInput.name) {
            alert('Name, Email & Password is REQUIRED!')
        }
        // const res = await fetch('/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name, email, password,
        //     }),
        // });
        setTextInput({ name: '', email: '', password: '' });
    }

    function handleNameInputChange(event) {
        setTextInput({ name: event.target.value, email: textInput.email, password: textInput.password });
    }

    function handleEmailInputChange(event) {
        if (!event.target.value) {
            setError(false);
        }
        setTextInput({ name: textInput.name, email: event.target.value, password: textInput.password });
    }

    function handlePasswordInputChange(event) {
        setTextInput({ name: textInput.name, email: textInput.email, password: event.target.value });
    }

    return (
        <Paper classes={{ root: classes.container }} elevation={2}>
            <Grid container={true} spacing={3}>
                <Grid item={true} xs={12}>
                    <Typography variant='h2' className={classes.typography}>
                        Register Form
                    </Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <Typography className={classes.typography} variant='h5'>
                        Name
                    </Typography>
                    <TextField
                        variant='outlined'
                        className={classes.textField}
                        value={textInput.name}
                        onChange={(e) => handleNameInputChange(e)}
                        fullWidth={true}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
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
                        to='/login'
                    >
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

Register.propTypes = {
    classes: PropTypes.object,
};

export default compose(withStyles(styles), withRouter)(Register)