import React from 'react'

const Map = () => {
  return (
    <div className='row justify-content-center'>
        <div className="mb-5 col-12 col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <iframe title='our-location' style={{border:'0', width: '100%', height: '300px'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.316985380117!2d52.34902672489962!3d36.47405927234188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8fa2bdc1583b29%3A0x91bf765ba0debc1b!2z2KfZhdin2YXYstin2K_ZhyDYp9io2LHYp9mH24zZhQ!5e0!3m2!1sfa!2s!4v1735863848726!5m2!1sfa!2s" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='col-12 col-lg-8 px-4' data-aos="fade-up" data-aos-delay="300"><h4 className='col-12'>راه های ارتباطی ما</h4></div>
        <div className='col-12 col-lg-8 px-4 row' data-aos="fade-up" data-aos-delay="400">
            <span className='col-12 col-md-6 mb-2'><i>آدرس موسسه‌: آمل - خیابان ... پلاک ....</i></span>
            <span className='col-12 col-md-6'><i>تلفن های تماس : 000-000-0000و 111-111-1111</i></span>
        </div>
    </div>
    //   <!-- End Google Maps -->
  )
}

export default Map
