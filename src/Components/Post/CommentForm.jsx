import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useCreateCommentMutation } from '../../APIs/commentApi';
import { MiniLoader } from '../Common';


//css
import './comments.css';
import { toastNotify } from '../../Helper';

const CommentForm = ({postId}) => {
    const [commentInput, setCommentInput] = useState("");
    const loggedInUser = useSelector((state)=> state.userAuthStore);
    const [loading,setLoading] = useState(false);
    const handleCommentInput = (e)=>{
        setCommentInput(e.target.value);
    }

    const [createComment] = useCreateCommentMutation();
    const handleCreateComment = async ()=>{
        setLoading(true);
        if(commentInput.trim() === "") alert("can not create an empty comment")
        else {
            if(loggedInUser.id === ""){
                alert("must login to comment on posts");
                return null;
            }
            try{
                let commentToCreate = {
                    authorId: loggedInUser.id,
                    content: commentInput,
                    postId: postId
                };
                let response = await createComment(commentToCreate)
                if(!response.data.isSuccess){
                    toastNotify(response.data.message, "error")
                    return null;
                }
                toastNotify(response.data.message,"success");
                setCommentInput("");
            }catch(ex){
                toastNotify(ex, 'error')
            }
        }
        setLoading(false);
    }
  return (
    <div className='comment-box'>
        <div className='col-12'>
            <textarea className='form-control'
                placeholder='type something...'
                rows={4}
                value={commentInput}
                onChange={handleCommentInput}
            >
            </textarea>
        </div>
        <div className='d-flex mt-2'>
            <button className='btn btn-success' disabled={loading} onClick={handleCreateComment}>
                {!loading ? 'ثبت نظر': <MiniLoader />}
            </button>
        </div>
    </div>
  )
}

export default CommentForm
