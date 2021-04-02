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

export const CreateMessage = ({username, setActiveCard}) => {
  const classes = useStyles();
     const initialMessage = {
        source : 'Source',
        destination : 'Destination',
        content :'Contents Of The Message',
        messageDate : '12/4/2021',
        messageTime : '21:00',
        message_id : 'Id1'
    };
    const [message, setMessage] = useState(initialMessage);


    const handleFormChanges = (e) => {
        setMessage({...message, [e.target.name] : e.target.value})
        
    }

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log('Message Sent');
        const currentTime = new Date();
        const messageDate = currentTime.toLocaleDateString();
        const messageTime = currentTime.toLocaleTimeString();

        const messagesRef = db.collection('messages');
        const messageData = {
            source: username,
            destination: message.destination,
            content: message.content,
            messageDate: messageDate,
            messageTime: messageTime
        }
        messagesRef.add(messageData)
        .then((docRef) => {
                console.log("Message Sent Successful ");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setMessage('');
        setActiveCard(1);
    }
    
    const backToInbox = () => {
        setActiveCard(1);
    }

  return (
      <Card className="new-message-card">
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit"
                        onClick={backToInbox} 
                        aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Create A Message
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
        <CardContent style={{textAlign: 'center'}} >
            <form className="" noValidate autoComplete="off">
                <TextField  
                    id="outlined-basic" 
                    name="destination" 
                    onChange={handleFormChanges} 
                    className="form-input" 
                    label="To : " 
                    variant="outlined"
                    autoFocus />
                <TextField
                    style={{marginTop: 20}} 
                    id="outlined-basic" 
                    name="content"
                    className="form-input"
                    label="Content" 
                    variant="outlined"
                    multiline
                    rows={5}
                    onChange={handleFormChanges}
                    // error
                    // helperText="Error Message" 

                />
                <Button style={{marginTop: 20}} onClick={sendMessage} variant="contained" color="primary" className="form-input" href="" > Send </Button>
            </form>

        </CardContent>
    </Card>
  );
}
