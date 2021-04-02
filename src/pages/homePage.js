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
    ));
   
    }, [])

    return (
        <div className="home-container" >
                
                    <Card className="inbox-card">
                        {/* <CardHeader title="Messages" style={{textAlign: 'center', backgroundColor: 'teal'}}></CardHeader> */}
                        <HomeHeader />
                            {messages.map((message) => (
                        <CardContent style={{textAlign: 'center'}} >
                                <Card style={{display: 'flex'}}>
                                <CardHeader
                                    style={{width: '20%'}}
                                    avatar={<Avatar aria-label="recipe" className=""> {message.source.charAt(0)} </Avatar> }
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
        </div>
        
        
    )
}
