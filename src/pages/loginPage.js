import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUp from './signUpPage'

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
  const [signBit, setSignBit] = useState(1)
  

  const changeForm = () => {
    setSignBit(2)
  }
  const onFinish = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

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

                    });
                })
                .catch((error) => {
                    console.log("Error getting User Profile: ", error);
                });
        })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Logging In Failed. Error Occured : ' + errorMessage)
        });
  }

  const signin =       <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFinish}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="email"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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

  const signup = <SignUp setSignBit={setSignBit} />;

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
    </Container>
  );
}

