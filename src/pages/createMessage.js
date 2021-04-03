import {React, useState } from 'react';
import {Card, TextField, Button, CardContent} from '@material-ui/core';
import db from '../firebase'
import { MiniHeader } from './miniHeader';

export const CreateMessage = ({username, setActiveCard}) => {
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
        const dateCreated = currentTime.toLocaleString();

        const messagesRef = db.collection('messages');
        const messageData = {
            source: username,
            destination: message.destination,
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
        setActiveCard(1);
    }
    
  return (
      <Card className="new-message-card">
       <MiniHeader title="Create a Message" setActiveCard={setActiveCard} />
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
