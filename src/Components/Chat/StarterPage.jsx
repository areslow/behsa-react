import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MiniLoader } from '../Common';
import {
  randomString
} from '../../Utilities/dummyFnc';
import { toastNotify } from '../../Helper';
import { SD_Roles } from '../../Utilities/SD';



const StarterPage = ({ connection, setIsConnected, requestList }) => {


  const [loading, setLoading] = useState(false)
  const loggedInUser = useSelector((state)=> state.userAuthStore);
  const [nameInput, setNameInput] = useState('');

  const handleUserInput = (e)=>{
    setNameInput(e.target.value)
  }



  const handleJoinRoom = async()=>{
    let requestUser = {
      id: loggedInUser.id,
      firstName: nameInput,
      lastName: "",
      userName: loggedInUser.userName,
      email: loggedInUser.email,
      role: loggedInUser.role
    }
    let roomName = loggedInUser.id !== "" ? loggedInUser.id + '_name_' + nameInput :
                                            randomString(32) + '_name_' + nameInput;
    try{
      if(connection) {
        await connection.start();
        await connection.invoke("RequestReceived", requestUser, roomName);
        connection.on("AgentJoined", (agent)=>{
          setIsConnected(true);
          toastNotify("you have connected to server");
        })
      }
    }
    catch(err){
      console.log('error while conecting to the support : ' + err)
    }
  }
  
  const handleJoinTochat = async () =>{

  }

  return (
    <>
      {(loggedInUser.role.includes(SD_Roles.ADMIN) || loggedInUser.role.includes(SD_Roles.SUPPORT)) ?
        <div className='container'>
          <div className='row'>
          {requestList.map((r,ind)=>(
              <button key={ind} className='btn btn-success mt-2 col-12'
                onClick={()=>(undefined)}
              >{r.name}</button>
          ))}
          </div>
        </div>
        :
        <>
          <span className='mt-3 p-2 border-bottom border-2 text-center'>برای شروع نام خود را وارد کنید</span>
          <input type='text' className='form-control mt-3' 
            placeholder='نام' 
            style={{fontSize:'0.90rem'}}
            name='userName'
            onChange={handleUserInput}
            value={nameInput}
          />
          <button disabled = {nameInput === "" || loading} className='btn btn-primary mt-3 col-12 mx-0'
            onClick = {handleJoinRoom}
          >
          
            {loading? <MiniLoader color='white' />: 'شروع'}
          </button>
        </>
      }
    </>
  )
}

export default StarterPage
