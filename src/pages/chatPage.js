import {React, useState, useEffect } from 'react';
import SendIcon from '@material-ui/icons/Send';
import {Card, Button, TextField, CardContent} from '@material-ui/core';
import db from '../firebase'
import {MiniHeader} from './miniHeader'
import '../cssFiles/chatPage.css'

import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2%',
        display: 'flex',
        marginBottom: '5%',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    input: {
        marginLeft: 2,
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export const ChatPage = ({chatMate, username, setActiveCard}) => {
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
    const [incomingMessages, setIncomingMessages] = useState([])
    const [outgoingMessages, setOutgoingMessages] = useState([])
    // const [chatMessages, setChatMessages] = useState(incomingMessages.concat(outgoingMessages))

    const handleFormChanges = (e) => {
        setMessage({...message, [e.target.name] : e.target.value})
        
    }

      useEffect(() => {
          const messageRef = db.collection('messages');
          var msg1 = messageRef.where("destination", "==", username).where("source", "==", chatMate)
          .orderBy("dateCreated");
          var msg2 = messageRef.where("source", "==", username).where("destination", "==", chatMate)
          .orderBy("dateCreated");

          msg1.onSnapshot(snapshot => (
              setIncomingMessages(  snapshot.docs.map((doc) => doc.data()  ))
            //   setIncomingMessages(  snapshot.docs.map((doc) => doc.data()  ))
          ));

          msg2.onSnapshot(snapshot => (
              setOutgoingMessages(snapshot.docs.map((doc) => doc.data()))
            //   setOutgoingMessages(snapshot.docs.map((doc) => doc.data()))
            //   console.log('out mesg added')
          ));

      }, [])

      // console.log(outgoingMessages)
//       const nch = incomingMessages.concat(outgoingMessages)
//       console.log('b4')
//       console.log(nch)

//       console.log('after')
//       const sorted =nch.sort((a, b) => b.messageTime - a.messageT)

//   console.log(sorted)


    const sendMessage = (e) => {
        e.preventDefault();
        // console.log('Message Sent');
        const currentTime = new Date();
        const messageDate = currentTime.toLocaleDateString();
        const messageTime = currentTime.toLocaleTimeString();
        const dateCreated = currentTime.toLocaleString();

        const messagesRef = db.collection('messages');
        const messageData = {
            source: username,
            destination: chatMate,
            content: message.content,
            dateCreated: dateCreated,
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
        // setActiveCard(1);
    }
    
  return (
      <div className="new-message-card" >
        <MiniHeader title={chatMate} setActiveCard={setActiveCard} />
        <div className="chat-container">
        {incomingMessages.concat(outgoingMessages).map((message) => (
            <p 
                className={message.source === username ? "outgoing-messages" : "incoming-messages"} >
                {message.content}
                </p>
        ))}
        </div>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder = "Reply Here.."
                    name="content"
                    autoFocus
                    onChange={handleFormChanges}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton type="submit" 
                    className={classes.iconButton} 
                    aria-label="send"
                    onClick={sendMessage}>
                    <SendIcon />
                </IconButton>
            </Paper>
    </div>
  );
}