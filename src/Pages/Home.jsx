import React, { useEffect } from 'react'

import PureCounter from '@srexi/purecounterjs';

// components
// import { IconBox, CourseCard, TeacherCard } from '../Components/Common';
import { TeacherCard, EventCard } from '../Components/Common';
import { Spiegel } from '../Components/News';
import { Hero } from '../Components/Pages';
import { Map } from '../Components';
import purecounter from '@srexi/purecounterjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

//css
//import 'swiper/css';
import 'swiper/css/effect-fade';
// import "swiper/swiper-bundle.css";





// const banner2 = require('../Assets/img/banner/adv1.jpg');

// const banner = require('../Assets/img/hero-bg.jpg');
const img1 = require('../Assets/img/about.jpg');
// const course1 = require('../Assets/img/course-1.jpg');
// const course2 = require('../Assets/img/course-2.jpg');
// const course3 = require('../Assets/img/course-3.jpg');
// const trainer1_2 = require('../Assets/img/trainers/trainer-1-2.jpg');
// const trainer2_2 = require('../Assets/img/trainers/trainer-2-2.jpg');
// const trainer3_2 = require('../Assets/img/trainers/trainer-3-2.jpg');
const tch1 = require('../Assets/img/trainers/trainer-1.jpg')
// const tch2 = require('../Assets/img/trainers/trainer-2.jpg')
// const tch3 = require('../Assets/img/trainers/trainer-3.jpg')
const evtImg1 = require('../Assets/img/about-2.jpg');
const evtImg2 = require('../Assets/img/events-item-2.jpg');


// const users = [
//     {
//         id: 1,
//         name: 'بهزاد',
//         lastName: 'قربانی',
//         speciality: 'زبان آلمانی',
//         image: trainer1_2
//     },
//     {
//         id: 1,
//         name: 'جواد',
//         lastName: 'قربانی',
//         speciality: 'زبان روسی',
//         image: trainer2_2
//     },
//     {
//         id: 1,
//         name: 'مهدی',
//         lastName: 'قربانی',
//         speciality: 'زبان انگلیسی',
//         image: trainer3_2
//     },

// ];

// const courses = [
//     {
//         id: 1,
//         category: 'آلمانی',
//         price: 1000,
//         title: 'آموزش پیشرفته آلمانی در 30 روز',
//         description: 'توضیحات مختصری درباره دوره ارائه شود تا دانش آموزان نسبت به دوره دید پیدا کنند',
//         courseImage: course1,
//         trainer :users[0]
//     },
//     {
//         id: 2,
//         category: 'آلمانی',
//         price: 2000,
//         title: 'دوره آموزش ابتدایی',
//         description: 'توضیحات مختصری درباره دوره ارائه شود تا دانش آموزان نسبت به دوره دید پیدا کنند',
//         courseImage: course2,
//         trainer :users[1]
//     },
//     {
//         id: 3,
//         category: 'زیان انگلیسی',
//         price: 3000,
//         title: 'انگلیسی برای کودکان',
//         description: 'توضیحات مختصری درباره دوره ارائه شود تا دانش آموزان نسبت به دوره دید پیدا کنند',
//         courseImage: course3,
//         trainer :users[2]
//     }
// ];

// const teachers = [
//     {
//       id: 3,
//       name: 'بهزاد',
//       lastName: 'قربانی',
//       speciality: 'زبان آلمانی',
//       description: 'استاد قربانی دارای تسلط کامل به ۶ زیان انگلیسی-آلمانی-روسی-چینی-هندی و ژاپنی می باشند',
//       image: tch1
//     },
//     {
//       id: 4,
//       name: 'جواد',
//       lastName: 'عزتی',
//       speciality: 'زبان روسی',
//       description:'در اینجا متنی در باره استاد قرار میگیرد',
//       image: tch2
//     },
//     {
//       id: 5,
//       name: 'مهدی',
//       lastName: 'جوادی',
//       speciality: 'زبان انگلیسی',
//       description:'در اینجا متنی در باره استاد قرار میگیرد',
//       image: tch3
//     },
// ];
const trainers = [
  {
    firstName: "بهزاد",
    lastName: "قربانی",
    description: "سطح B2 زبان آلمانی",
    image: tch1,
  },
  {
    firstName: "بهزاد",
    lastName: "قربانی",
    description: "سطح B2 زبان آلمانی",
    image: tch1,
  },
  {
    firstName: "بهزاد",
    lastName: "قربانی",
    description: "سطح B2 زبان آلمانی",
    image: tch1,
  },
  {
    firstName: "بهزاد",
    lastName: "قربانی",
    description: "سطح B2 زبان آلمانی",
    image: tch1,
  },
  {
    firstName: "بهزاد",
    lastName: "قربانی",
    description: "سطح B2 زبان آلمانی",
    image: tch1,
  },
];
const events = [
  {
    title: "کلاس های مکالمه گروهی",
    date: "شروع از تاریخ 1403/12/05",
    description: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    image:evtImg1,
  },
  {
    title: "کلاس های Free discussion  به زبان آلمانی",
    date: "Sunday, November 15th at 7:00 pm",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    image:evtImg2
  },
];


const Home = () => {

  useEffect(()=>{
    new purecounter();
  },[])
    
    
  return (
    <main className="main">

    {/* <!-- Hero Section --> 
        here goes site banner*/}
    <Hero />
    {/* <!-- /Hero Section --> */}
    <section id='news' className='news section d-flex justify-content-center'>
      <Spiegel />
    </section>
    
    {/* <!-- About Section --> */}
    <section id="about" className="about section">

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src={img1} className="img-fluid" alt="" />
          </div>

          <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
            
            <p className="text-dark">
                زبان آلمانی به عنوان دومین زبان پرتکلم اروپا شناخته می‌شه. این یعنی با یادگیری این زبان، در زمینه‌های مختلف از جمله علمی، پزشکی، تجارت و غیره می‌تونید به دیگران بپیوندید و موفقیت برای خودتون فراهم کنید. برای اینکه این موفقیت رو بدست بیارید، انتخاب یک آموزشگاه با کیفیت خیلی مهمه.
                ما تو این مسیر کنارتون هستیم و بهتون کمک میکنیم در کمترین زبان ممکن بیشترین بازدهی رو داشته باشید
            </p>
            <h3 className='text-dark'>ویژگی های دوره های آموزش زبان آلمانی ما</h3>
            <ul data-aos="fade-up" data-aos-delay="300">
              <li><i className="bi bi-check-circle"></i> <span>اساتید بومی و مجرب.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>خدمات متنوع آموزشی.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>منابع به‌روز و کاربردی.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>دوره‌های آموزش حضوری و آنلاین.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>مشاوره رایگان و برنامه‌ریزی دقیق.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>قیمت مناسب.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>وب‌ سایت معتبر و کانال‌های ارتباطی.</span></li>
            </ul>
            {/* <a href="#" className="read-more"><span>بیشتر بخوانید</span><i className="bi bi-arrow-left"></i></a> */}
          </div>

        </div>

      </div>

    </section>
    {/* <!-- /About Section --> */}
    {/* <section id='map-location'>
      <Map />
    </section> */}
    {/* <!-- Counts Section --> */} 
    <section id="counts" className="section counts light-background">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter"></span>
              <p>Students</p>
            </div>
          </div>
          {/* <!-- End Stats Item --> */}

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter"></span>
              <p>Courses</p>
            </div>
          </div>
          {/* <!-- End Stats Item --> */}

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter"></span>
              <p>Events</p>
            </div>
          </div>
          {/* <!-- End Stats Item --> */}

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="1" className="purecounter"></span>
              <p>Trainers</p>
            </div>
          </div>
          {/* <!-- End Stats Item --> */}

        </div>

      </div>

    </section>
    {/* <!-- /Counts Section --> */}
    
    {/* teachers section */}
    <section id='trainers' className='trainers section'>
      <div className="container section-title" data-aos="fade-up">
        <h2>مدرسین</h2>
        {/* <p>جدید ترین رویداد ها<br /></p> */}
      </div>
      {/* <!-- End Section Title --> */}
    <div className='container trainer-swiper p-5' style={{borderBottom:'1px solid green'}}>
      <Swiper
        modules = {[Pagination, Navigation, Autoplay]}
        loop = {true}
        speed={600}
        autoplay = {{
          delay: 5000,
        }}
        pagination = {{
          el:".trainer-pagination",
          type:"bullets",
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 40
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10
          },
        }}
        
      >
        {trainers.map((tr, index)=>(
          <SwiperSlide key={index}><TeacherCard teacher={tr} /></SwiperSlide>
        ))}
        
      </Swiper>
      <div className="trainer-pagination d-flex justify-content-center"></div>
    </div>
    </section>

    {/* event section */}
    <section id="events" className="events section">
      <div className="container section-title" data-aos="fade-up">
        <h2>رویداد ها</h2>
        <p>جدید ترین رویداد ها<br /></p>
      </div>
      {/* <!-- End Section Title --> */}
      <div className="container" data-aos="fade-up">
        <div className='row'>
          {events.map((evt,index)=>(
            <div className="col-md-6 d-flex align-items-stretch" key={index}>
              <EventCard event={evt} />
            </div>
          ))}
        </div>
      </div>
    </section>
    
    </main>
  )
}

export default Home
