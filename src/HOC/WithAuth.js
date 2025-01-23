import React from 'react'

const WithAuth = (WrappedComponent, returnAddress = "") => {
    return(props)=>{
        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            if(returnAddress !== "")
                window.location.replace(returnAddress);
            return null;
        }
        return <WrappedComponent {...props} />
    }
 
}

export default WithAuth
