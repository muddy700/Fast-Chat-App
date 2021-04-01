import {React, useEffect, useState} from 'react'
import {HomeHeader } from './homeHeader'
import '../cssFiles/homePage.css';
import {Card, Grid, TextField, Button} from '@material-ui/core';
import {Container, Avatar, CardHeader, CardContent, Typography, Box, Fab, IconButton, Menu, MenuItem } from '@material-ui/core';
// import firebase from '../firebase'
import db from '../firebase'


export const Home = ({username})=> {
    const initialMessage = {
        source : 'Source',
        destination : 'Destination',
        content :'Contents Of The Message',
        messageDate : '12/4/2021',
        messageTime : '21:00',
        message_id : 'Id1'
    };
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(initialMessage);
    // const [messageForm] = form.useForm();

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
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setMessage('');
    }
    
   
    useEffect(() => {
    // db.collection('messages')
    
    const messageRef = db.collection('messages');
    var msg = messageRef.where("destination", "==", username);
    msg.onSnapshot(snapshot => (
     setMessages(snapshot.docs.map((doc) => doc.data()))
    //  .get()
    //      .then((querySnapshot) => {
    //          querySnapshot.forEach((doc) => {
    //              // doc.data() is never undefined for query doc snapshots
    //              console.log(doc.id, " => ", doc.data().source , " => ", doc.data().destination);
    //          });
    //      })
    //      .catch((error) => {
    //          console.log("Error getting messages: ", error);
    //      });

    ));
   
    }, [])

    return (
        <Container className="Home-Container">
            <Grid container spacing={2} style={{height: '100%'}}>
                <Grid item className="left-card">
                    <Card >
                        <CardHeader title={username} style={{textAlign: 'center', backgroundColor: 'teal'}}></CardHeader>
                        <CardContent style={{textAlign: 'center'}} >
                            <form className="" noValidate autoComplete="off">
                                <TextField  id="outlined-basic" name="destination" onChange={handleFormChanges} className="form-input" label="Receiver" variant="outlined" />
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
                </Grid>
                <Grid item className="right-card">
                    <Card >
                        <CardHeader title="Messages" style={{textAlign: 'center', backgroundColor: 'teal'}}></CardHeader>
                            {messages.map((message) => (
                        <CardContent style={{textAlign: 'center'}} >
                                <Card style={{display: 'flex'}}>
                                <CardHeader
                                    style={{width: '20%'}}
                                    avatar={<Avatar aria-label="recipe" className=""> {message.destination.charAt(0)} </Avatar> }
                                    title ={message.source}
                                    subheader = {message.messageTime}
                                />
                                <CardContent style={{textAlign: 'left', width: '80%'}}>
                                    <p>{message.content} </p>
                                </CardContent>
                            </Card>
                        </CardContent>
                             )) }
                    </Card>
                </Grid>
            </Grid>
        </Container>
        
        
    )
}
