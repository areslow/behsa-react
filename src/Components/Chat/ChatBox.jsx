import React, { useState, useEffect } from 'react';
import StarterPage from './StarterPage';
import ChatContainer from './ChatContainer';

import {
    requestSupport,
    sendMessage
} from './chat';

//css
import './chatbox.css';
import { toastNotify } from '../../Helper';
import { useSelector } from 'react-redux';

//js
// import './chat'

const ChatBox = ({ connection }) => {
    const [open, setOpen] = useState(false);
    const loggedInUser = useSelector(state => state.userAuthStore);

    const handleCloseChat = ()=>{
        setOpen(false)
    }

    const [chatUser, setChatUser] = useState();
    const [requestList, setRequestList] = useState([{name: "dvd", groupName: "lsfdgkjhgkjdshgk"},{name: "cvc", groupName: "lsfdgkjhgkjdshgk"}]);
    const [userMessage, setUserMessage] = useState([]);
    const [name, setName] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    // const chatRoom = "some string here for the chatroom name. it can be a guid or anything"
    
    useEffect(()=>{
        if(connection){

            connection.on("MessageReceived", (chatUser, message)=>{
                setUserMessage(prevState => [...prevState, { chatUser, message }]);
                toastNotify("new message is received", "info")
            });
            connection.on("NotifySupport", (role, message, chatRoom)=>{
                if(loggedInUser.role === role) toastNotify(message + " _roomId = " + chatRoom, "warning");
            });

            connection.onclose(()=>{setIsConnected(false)});
            connection.onreconnecting((err)=>{
                toastNotify(`connection lost due to error : ${err}. reconnecting...`, "warning")
            });
        }
    },[connection, loggedInUser.role])


    const handleSendMessage = async (message) =>{
        if(connection){
            await connection.invoke("SendMessage", chatUser, message)
        }
    }

    



  return (
    <div className='support-chat' style={{position:'relative'}}>
    <div className={`chat-box ${!open && 'd-none'}`}>
        <div className='header d-flex pe-3 align-items-center' style={{height:'50px'}}>
            <i className='bi bi-x' style={{fontSize:'25px', cursor:'pointer'}}
                onClick={handleCloseChat}
            ></i>
        </div>
        <div className='d-flex flex-column px-3' style={{height:'calc(100% - 50px)'}}>
            {!isConnected ? 
             <StarterPage requestList = { requestList }  
                          setIsConnected = { setIsConnected }
                          connection = { connection }
                          //setChatUser = { setChatUser }      
            />
             :
             <ChatContainer connection = { connection } />
            }
        </div>
        
    </div>
    <button className={`chat-button ${open && 'd-none'}`}
            onClick={()=>setOpen(true)}
        ><i className='bi bi-chat-text' style={{fontSize:'25px'}}></i></button>
    </div>
  )
}

export default ChatBox
