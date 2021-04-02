import {React, useState} from 'react';
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

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import db from '../firebase'

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

export default function SignUp({setSignBit}){
  const classes = useStyles();
  const [isNameTaken, setIsNameTaken] = useState(false)

  const changeForm = () => {
      setSignBit(1);
  }

  const onFinish = (e) => {
    e.preventDefault()
    setIsNameTaken(false);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    const profileRef = db.collection('user_profile');
    // var profile = profileRef.where("username", "==", username);
    // console.log(profile);
    // profile.get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data().username);
    //             if(doc.id !== '' && doc.data().username === username){
    //                 setIsNameTaken(true)
    //                 console.log(' Name Already Exist')
    //                 // return "false";
    //             }
    //             else{
    //                 console.log('Name Is Available')
    //                 // return "true";
    //             }
                
    //         });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting Profile: ", error);
    //     });

        //else
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                console.log('User Created Successful')
                var user = userCredential.user;
                
                //Create UserProfile
                const newProfile = {
                    uid: user.uid,
                    username : username
                }

                profileRef.add(newProfile)
                    .then((docRef) => {
                        console.log("Profile Created Successful ");
                        setSignBit(1);
                    })
                    .catch((error) => {
                        console.error("Error While Creating Profile: ", error);
                    });

            })
            .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Error While Creating User ' + errorMessage)
                // ..
            });
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
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={isNameTaken}
            helperText={isNameTaken ? 'Username Already Exist!' : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
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

