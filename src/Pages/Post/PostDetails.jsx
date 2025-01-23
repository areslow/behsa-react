import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { 
    useGetPostByIdQuery,
    useTogglePostLockMutation,
    useEditPostMutation,
    useDeletePostMutation
 } from '../../APIs/postApi';

import { MainLoader } from '../../Components/Common';
import { PageTitle } from '../../Components/Pages';
import { CommentForm, Comments } from '../../Components/Post';

import {
    convertFromRaw
} from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

//css 
import './post.css'
import { SD_Roles } from '../../Utilities/SD';
import { toastNotify } from '../../Helper';

const PostDetails = () => {
    const [togglePostLock] = useTogglePostLockMutation();
    const [editPost] = useEditPostMutation();
    const [deletePost] = useDeletePostMutation();


    const loggedInUser = useSelector((state)=> state.userAuthStore);
    const { id } = useParams();
    const { data, isLoading} = useGetPostByIdQuery(id);
    
    useEffect(()=>{
        if(data && data.isSuccess){
            document.getElementById('post-content')
                .innerHTML = stateToHTML(convertFromRaw(JSON.parse(data.result.content)))}
    },[data])

    const handleTogglePostLock = async ()=>{
        let response = await togglePostLock(data.result.id);
        response.data.isSuccess ? toastNotify(response.data.message, 'info'):
                                  toastNotify(response.data.message, "error");
    }
  return (
    <main className='main'>
    
      {isLoading && <MainLoader />}
      {
        data && 
        (!data.isSuccess ? 
        <>there is no such item</>:
        <>
        <PageTitle title='مقالات'
                   descriptions='یک متن دلخواه در اینجا وارد کنید . مثلا توصیحات کلی در مورد دوره ها
                        همچنین میتوان در اینجا یک بنر قرار داد
                        استایل لینک ها هدر صفحه در صورت تمایل تغییر خواهند کرد'
                   breadcrumbs={[(<li key={1}><Link to='/'>خانه</Link></li>),
                                   (<li key={2}><Link to='/articles' className='me-1'>مقالات</Link></li>),
                                   (<li key={3}><span className='me-2'>{data.result.title ?? data.result.id}</span></li>),
                                ]}
        />
        <section id={`post${data.result.id}`} className='post-details section'>
            <div className='container text-dark'>
                <h1>{data.result.title}</h1>
                <div id='post-content' className='my-3'></div>
                <i>{data.result.references ? `رفرنس ها: ${data.result.references}`:''}</i>
                <hr />
                <div className='d-flex'>
                <i>تاریخ انتشار:  {data.result.dateCreated}</i>
                {loggedInUser.role === SD_Roles.ADMIN && (
                    <i className={`me-auto ${data.result.isOpen ? 'bi bi-unlock-fill text-success':'bi bi-lock-fill'}`}
                        onClick={handleTogglePostLock}
                        style={{fontSize:'25px'}}
                    ></i>
                )}
                </div>
                <div className='px-4 py-3'>
                {loggedInUser.id ? 
                   data.result.isOpen ? <CommentForm postId={id} />: <i>این پست توسط ادمین بسته شده</i>
                :
                 <>برای ثبت نظر <Link to='/login'>وارد</Link> شوید</>  
                }
                </div>
                <hr />
            </div>
            <div className='container'>
                
            </div>
            
        </section>

        <section id={`post-${data.result.id}-comments`} className='post-comments section'>
            <Comments postId={data.result.id} /> {/*this is a comment list */}
        </section>
        </>)
      }

      
    </main>
  )
}

export default PostDetails
