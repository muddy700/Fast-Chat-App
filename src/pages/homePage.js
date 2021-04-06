import {React, useEffect, useState} from 'react'
import {HomeHeader } from './homeHeader'
import '../cssFiles/homePage.css';
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, CardHeader, CardContent,Card, Fab} from '@material-ui/core';
import {CreateMessage} from './createMessage'
import {ChatPage} from './chatPage'
import { Profile} from './profilePage'
import db from '../firebase'
import Tooltip from '@material-ui/core/Tooltip';

export const Home = ({username, setCurrentUser, setRender})=> {
 
    const [activeCard, setActiveCard] = useState(1)
    const [senders, setSenders] = useState([])
    const [selectedChat, setSelectedChat] = useState('')
   
    useEffect(() => {
    const messageRef = db.collection('messages');
    var msg = messageRef.where("destination", "==", username);
    msg.onSnapshot(snapshot => (
     setSenders(Array.from(new Set( snapshot.docs.map((doc) => doc.data().source))))
    ));

}, [username])

    const signOut = () => {
        setRender(1)
        setCurrentUser('No Logged User');
        setActiveCard(1);
    }

    const openChatMessages = (sender) => {
        setSelectedChat(sender)
        setActiveCard(4)
    }


    const allowMessageCreation = () => {
        setActiveCard(2)
    }
    const inbox = <div>
                    <HomeHeader messageCounter={senders.length} signOut={signOut} setActiveCard={setActiveCard}  />
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
