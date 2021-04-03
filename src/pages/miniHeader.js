import {React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Card, Grid, TextField, Button, CardContent} from '@material-ui/core';
import db from '../firebase'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const MiniHeader = ({title, setActiveCard}) => {
  const classes = useStyles();
    const backToInbox = () => {
        setActiveCard(1);
    }

  return (
        <div className={classes.root} >
            <AppBar position="static" >
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit"
                        onClick={backToInbox} 
                        aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
  );
}
