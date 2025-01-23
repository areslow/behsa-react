import React, { useEffect, useState } from 'react';
import { inputHelper, toastNotify } from '../../Helper'
import { toast } from 'react-toastify';

import { useSendRequestMutation } from '../../APIs/contactFormApi';



const ContactForm = () => {

    const [loading, setLoading] = useState(false);

    const initlialFormData = {
        name: "",
        email: "",
        phoneNumber: "",
        message: ""
    }

    const [sendRequest] = useSendRequestMutation();


    const [userInfoInput, setUserInfoInput] = useState(initlialFormData);
    const handleUserInput = (e)=>{
        const tempData = inputHelper(e, userInfoInput);
        setUserInfoInput(tempData);
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("Name",userInfoInput.name);
        formData.append("Email",userInfoInput.email);
        formData.append("PhoneNumber",userInfoInput.phoneNumber);
        formData.append("Description",userInfoInput.message)
        
        try{
            let response = await sendRequest(formData);
            if(response && response.data.isSuccess){
                toastNotify("پیغام شما با موفقیت ارسال شد.", "success")
                setUserInfoInput(initlialFormData)
            } 
            else {
                toastNotify("خطایی پیش آمده ! لطفا بعدا تلاش کنید", "error")
            }
        }
        catch(ex){
            toastNotify("خطای سمت سرور! لصفا بعدا تلاش کنید", "error")
        }
        
        // send data
        
        // end send data
        
        setLoading(false);
    }

  return (
    <div className="col-lg-8">
    
      <div className='contact'>
        <form onSubmit={handleFormSubmit} method="post" className="contact-form"> {/* data-aos="fade-up" data-aos-delay="200" */}
            <div className="row gy-4">

            <div className="col-md-6">
                <input type="text" className="form-control" name="name"
                       placeholder="نام" required
                       value={userInfoInput.name}
                       onChange={handleUserInput}
                />
            </div>

            <div className="col-md-6 ">
                <input type="text" className="form-control" 
                       name="email" placeholder="ایمیل"
                       value={userInfoInput.email}
                       onChange={handleUserInput}
                />
            </div>

            <div className="col-md-12">
                <input type="text" className="form-control" 
                       name="phoneNumber" placeholder="شماره تماس" required 
                       value={userInfoInput.phoneNumber}
                       onChange={handleUserInput}
                />
            </div>

            <div className="col-md-12">
                <textarea className="form-control" name="message" rows="3"
                          value={userInfoInput.message}
                          onChange={handleUserInput}
                          resize = 'none'
                          placeholder="پیغام شما" required
                >
                </textarea>
            </div>

            <div className="col-md-12 text-center">
                
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
                <button type="submit" className='col-12 mx-0'>{loading? <span>در حال ارسال</span>: <span>ارسال</span>} {loading && <div className="loading"></div>}</button>
            </div>

            </div>
        </form>
        {/* <!-- End Contact Form --> */}
      </div>
    </div>
  )
}

export default ContactForm
