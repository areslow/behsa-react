import React, { useState } from 'react';

import { MiniLoader } from '../Components/Common'
import { inputHelper, toastNotify } from '../Helper';
import { useRegisterUserMutation } from '../APIs/authApi';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const initlialFormData = {
            userName: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordRepeat: "",
            phoneNumber: "",
            email: ""
    }

    const [userInfoInput, setUserInfoInput] = useState(initlialFormData);
    const handleUserInput = (e)=>{
        const tempData = inputHelper(e, userInfoInput);
        setUserInfoInput(tempData);
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const response = await registerUser({
            userName: userInfoInput.userName,
            password: userInfoInput.password,
            firstName: userInfoInput.firstName,
            lastName: userInfoInput.lastName,
            phoneNumber: userInfoInput.phoneNumber,
            email: userInfoInput.email
        });
        if(response.data.isSuccess){
            toastNotify(response.data.message, "success")
            navigate("/login");
        }
        else{
            toastNotify(response.data.message, "error")
        }
        // send a register request to server
        // after getting response
        setLoading(false);
    }

    const handleFormReset = (e)=>{
        setUserInfoInput(initlialFormData)
    }

  return (
    <main className='main'>
        <section className='register-page section d-flex justify-content-center'>
            <form onSubmit={handleFormSubmit}  method="post" className="register-form col-md-6" data-aos="fade-up" data-aos-delay="200"> {/* */}
                <div className="row gy-4 p-5">
                    <div className='col-12'>
                        <input type="text" className="form-control" name="userName"
                               placeholder="نام کاربری ..." required
                               value={userInfoInput.userName}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12 col-md-6'>
                        <input type="text" className="form-control" name="firstName"
                               placeholder="نام ..."
                               value={userInfoInput.firstName}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12 col-md-6'>
                        <input type="text" className="form-control" name="lastName"
                               placeholder=" نام خانوادگی ..."
                               value={userInfoInput.lastName}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12'>
                        <input type="password" className="form-control" required
                               name="password" placeholder="رمز عبور ..."
                               value={userInfoInput.password}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12'>
                        <input type="password" className="form-control" required
                               name="passwordRepeat" placeholder="تکرار رمز عبور ..."
                               value={userInfoInput.passwordRepeat}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12 col-md-6'>
                        <input type="text" className="form-control" name="email"
                               placeholder="ایمیل ..."
                               value={userInfoInput.email}
                               onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-12 col-md-6'>
                        <input type="text" className="form-control" name="phoneNumber"
                               placeholder="شماره تماس ..."
                               value={userInfoInput.phoneNumber}
                               onChange={handleUserInput}
                        />
                    </div>   
                    <div className="col-12 text-center px-4">
                        <div className='row justify-content-between align-items-center gy-4 gap-4'>
                            <div className="error-message"></div>
                            <button type="submit" className='col' disabled={loading}>{!loading? <span>ثبت نام </span>: <MiniLoader color='white' size='80%' />}</button>
                            <button type="reset" onClick={handleFormReset} className='col' disabled={loading}>پاک کردن</button>
                        </div>
                        <div className='mt-2'>قبلا حساب ایجاد کرده اید ؟ از <Link to='/login' style={{textDecoration:'none'}}>اینجا</Link> وارد شوید</div>
                    </div>
                </div>
            </form>
        </section>
    </main>
  )
}

export default Register
