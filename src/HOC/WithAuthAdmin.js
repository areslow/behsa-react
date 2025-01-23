import React from 'react';
// import { useSelector } from 'react-redux';
import { SD_Roles, JWTToken } from '../Utilities/SD';
import { AccessDenied, NotFound } from '../Pages';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const WithAuthAdmin = (WrappedComponent) => {   
    return(props) =>{
        const accessToken = localStorage.getItem(JWTToken) ?? "";
        if(accessToken && accessToken !== ""){
            const decoded = jwtDecode(accessToken);
            if(decoded.exp*1000 < Date.now() || !decoded.role.includes(SD_Roles.ADMIN)){
                // console.log("expired or not admin")
                return <NotFound />
            }
            // console.log("gocha")
            return <WrappedComponent {...props} />
        }
        else{
            // console.log("no token")
            return <NotFound />
        }
    }

}

export default WithAuthAdmin
