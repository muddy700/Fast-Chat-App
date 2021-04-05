import {React, useEffect, useState} from 'react'
import {HomeHeader } from './homeHeader'
import '../cssFiles/homePage.css';
import ChatIcon from '@material-ui/icons/Chat';
import {Card, Grid, TextField, Button} from '@material-ui/core';
import {Container, Avatar, CardHeader, CardContent, Typography, Box, Fab, IconButton, Menu, MenuItem } from '@material-ui/core';
// import firebase from '../firebase'
import {CreateMessage} from './createMessage'
import {ChatPage} from './chatPage'
import { Profile} from './profilePage'
import db from '../firebase'
import Tooltip from '@material-ui/core/Tooltip';



export const Home = ({username, setCurrentUser, setRender})=> {
 
    const [messages, setMessages] = useState([]);
    const [activeCard, setActiveCard] = useState(1)
    const [senders, setSenders] = useState([])
    const [senderMessages, setSenderMessages] = useState([])
    const [selectedChat, setSelectedChat] = useState('')
    const [lastIn, setLastIn] = useState({})
    const [lastOut, setLastOut] = useState([])
   
    useEffect(() => {
    const messageRef = db.collection('messages');
    var msg = messageRef.where("destination", "==", username);
    msg.onSnapshot(snapshot => (
     setMessages( snapshot.docs.map((doc) => doc.data()) ),
     setSenders(Array.from(new Set( snapshot.docs.map((doc) => doc.data().source))))
    ));
    // getSenderMessages();

    // getSenders()
}, [])

    const getSenderMessages = () => {
        // var sm = [];
        //     for(let s = 0; s<senders.length; s++) {
        //        sm[s] = messages.filter((msg) => msg.source === senders[s])
        //        sm[s].sender = senders[s];
        //     }
        //     // console.log(sm)
        //     setSenderMessages(sm);
    }

    // const getTheLastMessage = () => {
    //   const messageRef = db.collection('messages');
    //   messageRef.orderBy("name", "desc").limit(3);
    //   var msg1 = messageRef.where("destination", "==", username).where("source", "==", 'user2').orderBy("dateCreated", "desc").limit(1);
    //   var msg2 = messageRef.where("source", "==", username).where("destination", "==", 'user2')
    //       .orderBy("dateCreated", "desc").limit(1);

    //        msg1.onSnapshot(snapshot => (
    //            setLastIn(snapshot.docs.map((doc) => doc.data()))
    //            ));
    //            msg2.onSnapshot(snapshot => (
    //            setLastOut(snapshot.docs.map((doc) => doc.data()))
    //        ));

    //        var latest= [];
    //        latest.push(lastIn)
    //        latest.push(lastOut)
    //     //    console.log(
    //     //    latest.sort((a, b) => a.messageTime - b.messageTime))
    // }

    // getTheLastMessage();
    
    const signOut = () => {
        setRender(1)
        setCurrentUser('No Logged User');
        setMessages([]);
        setActiveCard(1);
    }
    const getSenders = () => {
        // const messageSenders = messages.map((msg) => msg.source)
        // const uniqueSenders = Array.from(new Set(messageSenders));
        // setSenders(uniqueSenders);
    }

    const openChatMessages = (sender) => {
        setSelectedChat(sender)
        setActiveCard(4)
    }


    const allowMessageCreation = () => {
        setActiveCard(2)
    }
    const inbox = <div>
                    <HomeHeader messageCounter={messages.length} signOut={signOut} setActiveCard={setActiveCard}  />
                    <div className="inbox-card" >
                        <Card 
                            className="message-card" 
                            onClick={e => {e.preventDefault(); openChatMessages('Admin')}}
                            >
                            <CardHeader
                                style={{width: '80%'}}
                                avatar={<Avatar aria-label="recipe" className="">
                                A </Avatar> }
                                title ='Admin'
                                subheader = "Click To View The Message"
                            />
                            <CardContent style={{width: '20%'}}>
                                <p>Time</p>
                            </CardContent>
                        </Card>
                        {senders.map((mb) => (
                        <Card 
                            className="message-card" 
                            key={mb} 
                            onClick={e => {e.preventDefault(); openChatMessages(mb)}}
                            >
                            <CardHeader
                                style={{width: '80%'}}
                                avatar={<Avatar aria-label="recipe" className="">
                                {mb.charAt(0).toUpperCase()} </Avatar> }
                                title ={mb}
                                subheader = "Click To View The Message"
                            />
                            <CardContent style={{width: '20%'}}>
                                <p>Time</p>
                            </CardContent>
                        </Card>
                            ))}
                        <Tooltip title="Start Chat" placement="top" arrow>
                            <Fab 
                                color="primary" 
                                aria-label="add" 
                                onClick={allowMessageCreation}
                                className="new-message">
                                <ChatIcon />
                            </Fab>
                        </Tooltip>
                    </div>
                  </div>;

    const newMessage = <CreateMessage setActiveCard={setActiveCard} username={username} setSelectedChat={setSelectedChat} />;
    const profile = <Profile  setActiveCard={setActiveCard} username={username} />;
    const chatPage = <ChatPage setActiveCard={setActiveCard} username={username} chatMate={selectedChat} />
    const contents = {
        1 : inbox,
        2 : newMessage,
        3 : profile,
        4 : chatPage
    }

    return (
    <Card className="home-container">
        { contents[activeCard] } 
    </Card>
    )
}
