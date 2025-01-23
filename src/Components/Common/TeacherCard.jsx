import React from 'react';


const TeacherCard = ({teacher}) => {
  return (
  <div className="col-md-11 member border rounded-4 py-5" data-aos="fade-up" data-aos-delay="100">
    <div className="member-img">
      <img src={teacher.image} className="img-fluid" alt="" />
      <div className="social">
        <a href="#"><i className="bi bi-telegram"></i></a>
        <a href="#"><i className="bi bi-instagram"></i></a>
        <a href="#"><i className="bi bi-whatsapp"></i></a>
      </div>
    </div>
    <hr className='mt-5 mx-4' />
    <div className="member-info text-center">
      <h4 className='mb-3'>{teacher.firstName + ' ' + teacher.lastName}</h4>
      <p>{teacher.description}</p>
    </div>
  </div>

  )
}

export default TeacherCard
