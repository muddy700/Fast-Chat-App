import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUp from './signUpPage'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import db from '../firebase'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        BrungasInc.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//End Of Copyright Function

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//End Of Styles 

export default function Login({setCurrentUser, setRender}){
  const classes = useStyles();
  const credentials = {
    email : '',
    password : ''
  }
  const [signBit, setSignBit] = useState(1)
  const [loginCredentials, setLoginCredentials] = useState(credentials)
  const [emailError, setEmailerror] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [isFormClear, setIsFormClear] = useState(false)
  const [openBackDrop, setOpenBackDrop] = useState(false)
  
  const closeBackDrop = () => {
    setOpenBackDrop(false);
  };

  // const handleToggle = () => {
  //   setOpenBackDrop(!openBackDrop);
  // };

  const changeForm = () => {
    setSignBit(2)
  }

  const handleLoginCredentials = (e) => {
    e.preventDefault()
    setLoginCredentials({...loginCredentials, [e.target.name] : e.target.value})
    if(e.target.name === 'email') {
      setEmailerror(false)
    }
    if(e.target.name === 'password') {
      setPasswordError(false)
    }
  }

  const formValidator = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = re.test(email)

    //For Email Validation
    if(email === '') {
      setEmailerror(true)
      setEmailErrorMessage('Email Cannot Be Blank!')
      return false;
    }
    else if (!emailResult) {
      setEmailerror(true)
      setEmailErrorMessage('Enter A Valid Email')
      return false;
    }
    else if(password === '') {
      setPasswordError(true)
      setPasswordErrorMessage('Password Cannot Be Blank!')
      return false;
    }
    else {
      // setLoginCredentials({ email : '', password : '' })
      setEmailerror(false);
      setPasswordError(false);
      setEmailErrorMessage('');
      setPasswordErrorMessage('');
      return true;
    }

  }
  const onFinish = (e) => {
    e.preventDefault()
    setOpenBackDrop(true)
    const validation = formValidator(e);
    // console.log(validation)
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if(validation) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // const uid = user.uid;
            console.log('Logged Successful...');
            
            const profileRef = db.collection('user_profile');
            var profile = profileRef.where("uid", "==", user.uid);
            profile.get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data().username + "'s Profile Obtained");
                setCurrentUser(doc.data().username);
                setRender(2)
                setLoginCredentials(credentials)
                setOpenBackDrop(false);

                    });
                })
                .catch((error) => {
                    console.log("Error getting User Profile: ", error);
                    setOpenBackDrop(false)
                });
        })
        .catch((error) => {
            // var errorCode = error.code;
            //Check Error Codes To Modify Message
            var errorMessage = error.message;
            console.log('Logging In Failed. Error Occured : ' + errorMessage)
            setOpenBackDrop(false)
            setEmailerror(true)
            setEmailErrorMessage('Incorrect Email Or Password!')
            
        });
    }
    else {
      console.log('The Login Form Is Invalid')
      setOpenBackDrop(false)
    }
  }

  const signin =       <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  name="loginForm" noValidate={false} onSubmit={onFinish}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleLoginCredentials}
            error={emailError}
            helperText={emailError  ?  emailErrorMessage : ''}
            value={loginCredentials.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            onChange={handleLoginCredentials}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError ? passwordErrorMessage : ''}
            value={loginCredentials.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Button
                type="link"
                fullWidth
                variant="text"
                color="primary"
                onClick={changeForm}
              >
                Don 't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

  const signup = <SignUp 
      setSignBit={setSignBit} 
      setOpenBackDrop={setOpenBackDrop}
      />;

  const formContent = {
    1 : signin ,
    2 : signup
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      {formContent[signBit]}
      <Box mt={8}>
        <Copyright />
      </Box>
      <Backdrop 
        className={classes.backdrop} 
        open={openBackDrop} 
        // onClick={closeBackDrop}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

