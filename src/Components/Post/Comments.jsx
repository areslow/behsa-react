import React, { useEffect } from 'react';
import { useGetPostCommentsQuery } from '../../APIs/commentApi';

import { useCreateCommentMutation } from '../../APIs/commentApi';

import { MiniLoader } from '../Common';
import { Comment, CommentForm } from '../Post'

import './comments.css'


const Comments = ({postId}) => {

    const { data, isLoading } = useGetPostCommentsQuery(postId);
    useEffect(()=>{
    },[data])

  return (
    <div className='container '>
      {isLoading ? <MiniLoader />:(
        <div className='row p-3 border text-dark'>
        {(data && data.result) && data.result.map((item, index)=>(
            <Comment key={index} comment={item} />
        ))}
        </div>
      )
      }
    </div>
  )
}

export default Comments
