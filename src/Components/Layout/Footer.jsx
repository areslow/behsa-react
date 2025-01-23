import React from 'react';
import { ContactForm } from '../Common';


const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative light-background">

      <div className="container footer-top">
        <div className="row gy-4">
        <div className="col-lg-5 col-md-12">
            <p>جهت دریافت مشاوره اطلاعات خود را وارد نمایید</p>
            <ContactForm />
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>منو</h4>
            <ul>
              <li><a href="/">خانه</a></li>
              <li><a href="/articles">مقالات</a></li>
              {/* <li><a href="#">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li> */}
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>خدمات مجموعه</h4>
            <ul>
              <li><a href="#">کلاس های گروهی و خصوصی</a></li>
              <li><a href="#">گرو های مکالمه در تلگرام</a></li>
              <li><a href="#">مشاوره های آموزشی</a></li>
              {/* <li><a href="#">Marketing</a></li>
              <li><a href="#">Graphic Design</a></li> */}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">بهسا</span>
            </a>
            <div className="footer-contact pt-3">
              <p>آموزش زبان آلمانی بهسا</p>
              <p>آمل</p>
              <p className="mt-3">
                <strong className='d-block'>تلفن تماس: </strong> 
                <span className='d-block mt-1 px-2'>0912-000-0000</span>
                <span className='d-block px-2'> 0912-000-0000</span>
              </p>
              <p><strong>ایمیل : </strong><span>info@example.com</span> </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="" className='whatsapp'><i className="bi bi-whatsapp"></i></a>
              <a href="" className='instagram'><i className="bi bi-instagram"></i></a>
              <a href="https://t.me/spreschen_wir_Deutsch" className='telegram'><i className="bi bi-telegram"></i></a>
            </div>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Mentor</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          {/* <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you've purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
          
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Distributed by <a href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer
