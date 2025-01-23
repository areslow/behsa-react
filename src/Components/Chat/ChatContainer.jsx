import React, { useState, useEffect } from 'react';

const ChatContainer = ({connection, userMessage}) => {

  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if(messageInput.trim()){

    }
  }

  const handleKeyPress = (e)=>{
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className='chat-container h-100 d-flex flex-column'>
        <div className='chat-list mb-auto'> {/* message list */}
          {/* {userMessage.map((uM, ind)=>(
            <div key={ind} className='mt-2'>
              {uM.chatUser.name} : <span>{uM.message}</span>
            </div>
          ))} */}
        </div>
        <div className='chat-tools d-flex rounded-2 mb-3 p-2' style={{backgroundColor:'var(--accent-color)'}}>
            <textarea placeholder='اینجا بنویسید...' 
                style={{
                        resize:'none',
                        backgroundColor:'inherit',
                        border:'none',
                        outline:'none',
                        color:'white'
                    }}
                rows={1}
                className='col'
                value={messageInput}
                onChange={ (e)=> setMessageInput(e.target.value) }
                onKeyPress={handleKeyPress}
            ></textarea>
            <button className='btn btn-sm btn-secondary'><i className='bi bi-paperclip'></i></button>
            <button className='btn btn-sm btn-primary'
              onClick={handleSendMessage}
            ><div className='ms-1' style={{rotate:'220deg'}}><i className='bi bi-send-fill'></i></div></button>
        </div>
    </div>
  )
}

export default ChatContainer
