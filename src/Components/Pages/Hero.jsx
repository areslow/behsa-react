import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

//css
import 'swiper/css';
import 'swiper/css/effect-fade';

const heroBg = require('../../Assets/img/hero-bg.jpg');

const Hero = () => {
  return (
    <section id="hero" className="hero section dark-background">
        <img className='ms-1' src={heroBg} alt="" data-aos="fade-in" />
        <div className="container">
        <h2 className='mb-2' data-aos="fade-up" data-aos-delay="100">آموزشگاه بهسا</h2>
        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper 
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              className='mySwiper'
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              allowTouchMove = {false}
              speed={600}
          >
              <SwiperSlide>
                <h3 className='fw-bolder'>خدمات متنوع آموزشی</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
              <SwiperSlide>
                <h3 className='fw-bolder'>منابع به‌ روز و کاربردی</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
              <SwiperSlide>
                <h3 className='fw-bolder'>اساتید بومی و مجرب</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
              <SwiperSlide>
                <h3 className='fw-bolder'>دوره‌های آموزش حضوری و آنلاین</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
              <SwiperSlide>
                <h3 className='fw-bolder'>مشاوره رایگان و برنامه‌ریزی دقیق</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
              <SwiperSlide>
                <h3 className='fw-bolder'>قیمت مناسب</h3>
                <p>متن آزمایشی - یک متن دلخواه در اینجا اضافه کنید</p>
              </SwiperSlide>
          </Swiper>
        </div>
        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
            <a href="courses.html" className="btn-get-started">Get Started</a>
        </div>
        </div>
    </section>
  )
}

export default Hero
