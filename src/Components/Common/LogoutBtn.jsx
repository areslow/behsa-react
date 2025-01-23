import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedInUser, emptyUserState } from '../../Storage/Redux/userAuthSlice';

const LogoutBtn = () => {

    const dispatch = useDispatch();

    const handleLogout = ()=>{
      localStorage.removeItem("jwtToken");
      dispatch(setLoggedInUser({...emptyUserState}));
      window.location.reload();
    }
    
  return (
    <button onClick={handleLogout} className='btn btn-sm' 
            style={{borderRadius: '50%', margin: '0 10px 0 10px', order:'2'}}>
      <i className='bi bi-power'></i>
    </button>
  )
}

export default LogoutBtn
