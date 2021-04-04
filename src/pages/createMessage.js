import {React, useState } from 'react';
import {Card, TextField, Button, CardContent} from '@material-ui/core';
import db from '../firebase'
import { MiniHeader } from './miniHeader';

export const CreateMessage = ({username, setActiveCard}) => {
    const initialMessage = {
        source : '',
        destination : '',
        content :'',
        messageDate : '',
        messageTime : '',
        dateCreated : ''
    };
    const [message, setMessage] = useState(initialMessage);
    const [receiverError, setReceiverError] = useState(false)
    const [receiverErrorMessage, setReceiverErrorMessage] = useState(false)

    const handleMessageForm = (e) => {
        setMessage({...message, [e.target.name] : e.target.value})
        if(e.target.name === 'destination') {
            setReceiverError(false)
        }
    }

    const messageValidator = (e) => {
        e.preventDefault();
        const receiver = e.target.destination.value;
        const isReceiverExist = true;

        if(receiver === '') {
            setReceiverError(true)
            setReceiverErrorMessage('Receiver Cannot Be Blank!')
            return false;
        }
        else if(!isReceiverExist) {
            setReceiverError(true)
            setReceiverErrorMessage('Receiver Does Not Exist')
            return false;
        }
        else {
            setReceiverError(false)
            setReceiverErrorMessage('')
            return true
        }

    }

    const sendMessage = (e) => {
        e.preventDefault();
        const currentTime = new Date();
        const validation = messageValidator(e);
        console.log(validation)
        
        if(validation) {
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
                    setMessage(initialMessage)
                })
                .catch((error) => {
                    console.error("Error Sending Message: ", error);
                });
            setMessage(initialMessage);
            // setActiveCard(1);
        }
        else {
            console.log('Message Form Is Not Valid')
        }
    }
    
  return (
      <Card className="new-message-card">
       <MiniHeader title="Create a Message" setActiveCard={setActiveCard} />
        <CardContent style={{textAlign: 'center'}} >
            <form 
                name="messageForm" 
                autoComplete
                onSubmit={sendMessage}>
                <TextField  
                    id="outlined-basic" 
                    name="destination" 
                    onChange={handleMessageForm} 
                    className="form-input" 
                    label="To : " 
                    variant="outlined"
                    error={receiverError}
                    value={message.destination}
                    helperText={receiverError ? receiverErrorMessage : ''}
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
                    value={message.content}
                    onChange={handleMessageForm}
                    // error
                    // helperText="Error Message" 

                />
                <Button 
                    style={{marginTop: 20}} 
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className="form-input"
                    disabled={!message.content ? true : false} 
                    > Send </Button>
            </form>

        </CardContent>
    </Card>
  );
}
