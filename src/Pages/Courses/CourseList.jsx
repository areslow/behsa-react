import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageTitle } from '../../Components/Pages';
import { CourseCard } from '../../Components/Common';
import { useGetAllProductsQuery } from '../../APIs/productApi';
import { SD_Roles } from '../../Utilities/SD';

const CourseList = () => {
    const loggedInUser = useSelector((state) => state.userAuthStore);
    const { data, isLoading } = useGetAllProductsQuery();
    // useEffect(()=>{
    //     if(data && !isLoading) console.log("data: ", data)
    // },[data, isLoading]);

  return (
    <main className="main">

        {/* <!-- Page Title --> */}
        <PageTitle title='دوره ها'
                   descriptions='یک متن دلخواه در اینجا وارد کنید . مثلا توصیحات کلی در مورد دوره ها
                        همچنین میتوان در اینجا یک بنر قرار داد
                        استایل لینک ها هدر صفحه در صورت تمایل تغییر خواهند کرد'
                   breadcrumbs={[(<li key={1}><Link to='/'>خانه</Link></li>),
                                   (<li key={2} className="current"><span className='me-1'>دوره ها</span></li>)
                                ]}
        />
        {/* <!-- End Page Title --> */}

        {/* <!-- Courses Section --> */}
        <section id="courses" className="courses section">
            <div className="container">
                <div className="row">
                   {(!isLoading && data && data.result && data.result.length > 0) ? 
                    data.result.map((course, index)=>(
                        <div key={index} className="col-lg-4 col-md-6 d-flex mt-2" data-aos="zoom-in" data-aos-delay="100"> {/*align-items-stretch */}
                            <CourseCard course={course} />
                        </div> 
                    )):
                    <div>هنوز هیج آیتمی ثبت نشده است 
                        {(loggedInUser.role && loggedInUser.role.includes(SD_Roles.ADMIN)) && 
                            <Link to='/admin/course-upsert' style={{textDecoration:'none'}}> افزودن آیتم جدید</Link>
                        }
                    </div>
                   }
                    
                    
                    {/* <!-- End Course Item--> */}
                </div>
                {/**dkfjghjk */}
            </div>
        </section>
        {/* <!-- /Courses Section --> */}
    </main>
  )
}

export default CourseList
