import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from "react-toastify";	
import { withRouter } from "react-router-dom";

import { actionTest, actionLogin } from "../reducer.js";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormGroup from '@material-ui/core/FormGroup'
import LoginBackgroundImage from '../img/loginbackground.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + LoginBackgroundImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '80%',
        marginLeft: '10%'
    },
    loginForm: {
        [theme.breakpoints.up("md")]: {
            paddingTop: '20vh',
        },
	},
	dialogBox: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	dialogTextField: {
		minWidth: '25vw',
		margin: theme.spacing(1,0)
	},
	dialogButton: {
		padding: theme.spacing(1),
		marginLeft: theme.spacing(4),
		marginBottom: theme.spacing(2),
	}
}));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            Wayside Restaurant Inc.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function LoginPage(props) {
    const classes = useStyles();
    
    const [dialogOpenStatus, setDialogOpenStatus] = useState(false);

    const checkLoginFields = () => {
        const usernameField = document.getElementById('username-field').value;
		const passField = document.getElementById('password-field').value;
		if (usernameField.length === 0) {
			toast("Please enter a username first!");
			return false;
		}
		else if (passField.length < 8) {
			toast("Password must be at least 8 characters long.");
			return false;
		}
		return true;
	}
	const checkRegistrationFields = () => {
		const usernameField = document.getElementById('register-username-field').value;
		const passField = document.getElementById('register-password-field').value;
		const passConfirmField = document.getElementById('register-password-confirm-field').value;
		const nameField = document.getElementById('register-name-field').value;
		if (usernameField.length === 0) {
			toast("Please enter a username first!");
			return false;
		}
		else if (passField.length < 8) {
			toast("Password must be at least 8 characters long.");
			return false;
		}
		else if (passField !== passConfirmField) {
			toast("Please confirm your password correctly.");
			return false;
		}
		else if (nameField.length === 0) {
			toast("Please enter your name.");
			return false;
		}
		return true;
	}
    const performLogin = () => {
		if (!checkLoginFields())
			return;
		console.log("Received login request");
		const usernameField = document.getElementById('username-field').value;
		const passField = document.getElementById('password-field').value;
		const objectToSend = {
			userName: usernameField,
			userPass: passField
		}
		//props.history.push('/emp');
		fetch('http://localhost:8125/api/login', {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(objectToSend)
		}).then(res => {
			return res.json();
		}).then(res => {
			if (res.status === 'ERROR_USER_NOT_FOUND') {
				toast('Error: Username not found.');
			}
			else if (res.status === 'ERROR_PASSWORD_MISMATCH') {
				toast('Error: Wrong password. Please try again.');
			}
			else if (res.status === 'LOGIN_SUCCESSFUL') {
				const toastId = toast("Login successful! Please wait...");
				const userDetails = {
					empName: res.name,
					userId: res.userId,
					userToken: res.sessionToken,
					isManager: res.admin,
				}
				props.actionLogin(userDetails);
				// Handle extra details obtained on login based on if manager or not
			}
			else {
				toast('Unknown error.');
				console.log('Error: '+res.status);
			}
		}).catch(err => {
			toast('Unexpected error.');
			throw err;
		})
    }
    const performRegistration = () => {
		if (!checkRegistrationFields())
			return;
		console.log("Received registration request");
		const usernameField = document.getElementById('register-username-field').value;
		const passField = document.getElementById('register-password-field').value;
		const nameField = document.getElementById('register-name-field').value;
		const isManager = document.getElementById('register-is-manager-checkbox').checked;
		const objectToSend = {
			name: nameField,
			userName: usernameField,
			userPass: passField,
			admin: isManager
		}
		fetch('http://localhost:8125/api/register', {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(objectToSend)
		}).then(res => {
			return res.json();
		}).then(res => {
			if (res.status === 'ERROR_USER_NAME_TAKEN') {
				toast('Error: Username is already taken. Please pick another one.');
			}
			else if (res.status === 'REGISTRATION_SUCCESS') {
				toast('Registration successful! Please log in with your new account.');
				setDialogOpenStatus(false);
			}
			else {
				toast('Unknown Error.');
				console.log("Error:" + res.status);
			}
		}).catch(err => {
			toast('Unexpected error.');
			setDialogOpenStatus(false);
			throw err;
		})
    }
    return (
        <React.Fragment>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={8} className={classes.image} />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square className={classes.loginForm}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username-field"
                                label="Username"
                                name="Username"
                                autoComplete="username"
                                autoFocus />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password-field"
                                autoComplete="current-password" />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                style={{ marginLeft: '1%' }} />
                                    {/* Replace onClick with login action */}
                            <Button
                                onClick={performLogin}
                                variant="contained"
                                color="primary"
                                className={classes.submit} >
                                Sign In
                            </Button>
                            <Grid container justify='center'>
                                    {/* Replace onClick with registration action */}
                                <Button
                                    onClick={() => setDialogOpenStatus(true)}
                                    variant="text"
                                    color="primary">
                                    Register Here!
                                </Button>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <Dialog open={dialogOpenStatus} onClose={() => setDialogOpenStatus(false) }>
                <DialogTitle> Register </DialogTitle>
                <DialogContent className={classes.dialogBox} >
                    <DialogContentText> Register as a new employee or manager here. </DialogContentText>
					<FormGroup>
						<TextField
							className={classes.dialogTextField}
							id="register-username-field"
							variant='outlined'
							label='Username' 
						/>
						<TextField
							className={classes.dialogTextField}
							id="register-password-field"
							variant='outlined'
							label='Password'
							type='password'
						/>
						<TextField
							className={classes.dialogTextField}
							id="register-password-confirm-field"
							variant='outlined'
							label='Password'
							type='password'
						/>
						<TextField
							className={classes.dialogTextField}
							id="register-name-field"
							variant='outlined'
							label='Employee Name' 
						/>
						<FormControlLabel
							control={<Checkbox id='register-is-manager-checkbox' color="primary" />}
							label="Register as a manager"
							style={{ marginLeft: '1%' }} />
					</FormGroup>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'left' }} >
                    <Button onClick={performRegistration} variant='outlined' color='primary' className={classes.dialogButton}>Register</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
	return {
		testState: state.testData,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setData: data => dispatch(actionTest(data)),
		actionLogin: data => dispatch(actionLogin(data))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginPage));