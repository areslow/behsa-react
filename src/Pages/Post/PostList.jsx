import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useGetAllPostsQuery } from '../../APIs/postApi'
import { useGetAllReceivedRequestQuery } from '../../APIs/contactFormApi'

import { MainLoader } from '../../Components/Common';
import { PageTitle } from '../../Components/Pages';

// css
import './post.css'

const PostList = () => {

    const { data, isLoading } = useGetAllPostsQuery();
    // useEffect(()=>{
    //     if(data)console.log('data: ', data.result);

    // },[isLoading]);

  return (
    <main className='main'>
        <PageTitle title='مقالات'
                   descriptions='یک متن دلخواه در اینجا وارد کنید . مثلا توصیحات کلی در مورد دوره ها
                        همچنین میتوان در اینجا یک بنر قرار داد
                        استایل لینک ها هدر صفحه در صورت تمایل تغییر خواهند کرد'
                   breadcrumbs={[(<li key={1}><Link to='/'>خانه</Link></li>),
                                   (<li key={2} className="current"><span className='me-1'>مقالات</span></li>)
                                ]}
        />
        <section id="postList" className="postList section">
        {isLoading? 
            <MainLoader />:
           (
            <div className="container">
                <div className='row justify-content-center border mb-5'>search bar</div>
                <div className="row gy-4">
                    {(data && data.result) && data.result.map((item, index)=>(
                        <div key={index} className='col-12 p-3 post-card border'>
                            <h3 className='d-inline border-bottom'>{item.title}</h3>
                            <p className='mt-4'>{item.abstract}</p>
                            <hr />
                            <Link to={`/articles/${item.id}`}>بیشتر ...</Link>
                        </div>
                    ))}
                </div>
            </div>
           )
        }
        </section>
    </main>
  )
}

export default PostList
