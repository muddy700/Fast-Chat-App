import {React, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import db from '../firebase'

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

export default function SignUp({setSignBit, setOpenBackDrop}){
  const classes = useStyles();
  const credentials = {
      username : '',
      email: '',
      password: ''
  }
  const [isNameTaken, setIsNameTaken] = useState(false)
  const [signUpCredentials, setSignUpCredentials] = useState(credentials)
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailerror] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const changeForm = () => {
      setSignBit(1);
  }

  const handleSignUpCredentials = (e) => {
    e.preventDefault()
    setSignUpCredentials({...signUpCredentials, [e.target.name] : e.target.value})
    if(e.target.name === 'username') {
      setUsernameError(false)
    }
    if(e.target.name === 'email') {
      setEmailerror(false)
    }
    if(e.target.name === 'password') {
      setPasswordError(false)
    }
  }

  const formValidator = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = re.test(email)

    //For Email Validation
    if(username === '') {
      setUsernameError(true)
      setUsernameErrorMessage('Username Cannot Be Blank!')
      return false;
    }
    else if(username.length < 4) {
      setUsernameError(true)
      setUsernameErrorMessage('Use Atleast 4 Characters')
      return false;
    }
    else if(email === '') {
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
    else if(password.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage('Use AtLeast Six Characters')
      return false;
    }
    //  if (!(/^[a-zA-Z]*$/.test(secondKey.value)))
    // else if (!(/^[a-z]*$/.test(password))) {
    //   setPasswordError(true)
    //   setPasswordErrorMessage('Include AtLeast One Lowercase Letter')
    //   return false;
    // }
    // else if (!(/^[0-9]*$/.test(password))) {
    //   setPasswordError(true)
    //   setPasswordErrorMessage('Include AtLeast One Numerical Value')
    //   return false;
    // }
    // else if (!(/^[A-Z]*$/.test(password))) {
    //   setPasswordError(true)
    //   setPasswordErrorMessage('Include AtLeast One UpperCase Letter')
    //   return false;
    // }
    else {
      // setLoginCredentials({ email : '', password : '' })
      setUsernameError(false);
      setEmailerror(false);
      setPasswordError(false);
      setEmailErrorMessage('');
      setPasswordErrorMessage('');
      return true;
    }
    
  }
  const onFinish = (e) => {
    e.preventDefault();
    setOpenBackDrop(true)
    const validation = formValidator(e);
    // console.log(validation)
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;
    const profileRef = db.collection('user_profile');

    if(validation) {
        profileRef.where('username', '==', username).get()
          .then(snapshot => {
            if (snapshot.empty) {
                  return firebase.auth().createUserWithEmailAndPassword(email, password);
            } 
            else {
                  setOpenBackDrop(false);
                  setUsernameError(true);
                  setUsernameErrorMessage('Username Already Taken')
            } 
          })
          .then(createdUser => {
            if(createdUser) {
            const id = createdUser.user.uid;
            
            //Create UserProfile
            profileRef.doc(id).set({username: username, uid: id})
            .then((docRef) => {
              setSignBit(1);
              setOpenBackDrop(false);
              setSignUpCredentials(credentials) })
            .catch((error) => {setOpenBackDrop(false)});
          }})
          .catch((error) => {
            setOpenBackDrop(false);
            if (error.code === "auth/email-already-in-use") {
              setEmailerror(true);
              setEmailErrorMessage('The Email Is Already In Use') } });
            }
      else {
        console.log('The Sign Up Form Is Not Valid')
        setOpenBackDrop(false);
        }
  }

  return (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFinish}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={usernameError}
            value={signUpCredentials.username}
            onChange={handleSignUpCredentials}
            helperText={usernameError ? usernameErrorMessage : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={handleSignUpCredentials}
            error={emailError}
            helperText={emailError  ?  emailErrorMessage : ''}
            value={signUpCredentials.email}
            autoComplete="email"
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
            onChange={handleSignUpCredentials}
            error={passwordError}
            helperText={passwordError ? passwordErrorMessage : ''}
            value={signUpCredentials.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
            <Button
                type="link"
                fullWidth
                variant="text"
                color="primary"
                onClick={changeForm}
              >
                Already have an account? Sign In              
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
  );
}

