import {React, useEffect, useState} from 'react'
import {HomeHeader } from './homeHeader'
import '../cssFiles/homePage.css';
import ChatIcon from '@material-ui/icons/Chat';
import {Card, Grid, TextField, Button} from '@material-ui/core';
import {Container, Avatar, CardHeader, CardContent, Typography, Box, Fab, IconButton, Menu, MenuItem } from '@material-ui/core';
// import firebase from '../firebase'
import {CreateMessage} from './createMessage'
import { Profile} from './profilePage'
import db from '../firebase'


export const Home = ({username, setCurrentUser, setRender})=> {
 
    const [messages, setMessages] = useState([]);
    const [activeCard, setActiveCard] = useState(1)
    // const [messageForm] = form.useForm();


   
    useEffect(() => {
    // db.collection('messages')
    
    const messageRef = db.collection('messages');
    var msg = messageRef.where("destination", "==", username);
    msg.onSnapshot(snapshot => (
     setMessages(snapshot.docs.map((doc) => doc.data()))
    ));
   
    }, [])

    const signOut = () => {
        setRender(1)
        setCurrentUser('No Logged User');
        setMessages([]);
        setActiveCard(1);
    }

    const allowMessageCreation = () => {
        setActiveCard(2)
    }
    const inbox = <div>
            <HomeHeader messageCounter={messages.length} signOut={signOut} setActiveCard={setActiveCard}  />
            {/* <CardContent */}
            <div className="inbox-card" >
                {messages.map((message) => (
                <Card className="message-card">
                    <CardHeader
                        style={{width: '80%'}}
                        avatar={<Avatar aria-label="recipe" className="">
                        {message.source.charAt(0)} </Avatar> }
                        title ={message.source}
                        subheader = {message.content}
                    />
                    <CardContent style={{width: '20%'}}>
                        <p>{message.messageTime} </p>
                    </CardContent>
                </Card>
                    ))}
            <Fab 
                color="primary" 
                aria-label="add" 
                onClick={allowMessageCreation}
                className="new-message">
                <ChatIcon />
            </Fab>
            </div>
            {/* </CardContent> */}
        </div>;

    const newMessage = <CreateMessage setActiveCard={setActiveCard} username={username} />;
    const profile = <Profile  setActiveCard={setActiveCard} username={username} />;
    const contents = {
        1 : inbox,
        2 : newMessage,
        3 : profile
    }

    return (
    <Card className="home-container">
        { contents[activeCard] } 
    </Card>
    )
}
