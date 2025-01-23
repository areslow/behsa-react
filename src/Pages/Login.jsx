import React, { useState } from 'react';
import { inputHelper, toastNotify } from '../Helper';
import { MiniLoader } from '../Components/Common';
import { useLoginUserMutation } from '../APIs/authApi';
import JWT_Decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emptyUserCredentials = {
        userName: "",
        password: ""
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser] = useLoginUserMutation();

    const [loading, setLoading] = useState(false);

    const [userCredentials, setUserCredentials] = useState(emptyUserCredentials)
    const handleUserInput = (e) =>{
        const tempData = inputHelper(e, userCredentials);
        setUserCredentials(tempData)
    }
    

    const handleLoginSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        
        try{
                let response = await loginUser(userCredentials);
                if(response && response.data.isSuccess){
                toastNotify(response.data.message, "success");
                const { token } = response.data.result;
                const { userName, fullName, id, email, role } = JWT_Decode(token);
                localStorage.setItem("jwtToken", token);
                dispatch(setLoggedInUser({ userName, fullName, id, email, role }));
                navigate("/");
            }else{
                toastNotify(response.data.message, "error")
            }
        }
        catch(ex){
            toastNotify("can't login now! try again later or contact admin", "error");
            // console.log(ex)
        }
        
        setLoading(false)
    }
  return (
    <main className='main'>
        <section className='login-page section d-flex justify-content-center'>
            <form onSubmit={handleLoginSubmit}  method="post" className="login-form w-50" data-aos="fade-up" data-aos-delay="200"> {/* */}
                <div className="row gy-4 justify-content-center">
                    <input type="text" className="form-control" name="userName"
                       placeholder="نام کاربری ..." required
                       value={userCredentials.userName}
                       onChange={handleUserInput}
                    />

                    <input type="password" className="form-control" 
                       name="password" placeholder="رمز عبور ..."
                       value={userCredentials.password}
                       onChange={handleUserInput}
                    />
                    <div className="error-message"></div>
                    <div className="mt-4 row justify-content-center align-items-center">
                        <button type="submit" className='col-12 col-md-5' disabled={loading}>{!loading? <span>ورود</span>: <MiniLoader color='white' size='80%' />}</button>
                        <div className='col-12 col-md-5'>حساب کاربری ندارید ؟ <Link className='text-success' to="/register" style={{textDecoration:'none'}}> ساخت حساب </Link></div>
                    </div>
                </div>
            </form>
        </section>
    </main>
  )
}

export default Login
