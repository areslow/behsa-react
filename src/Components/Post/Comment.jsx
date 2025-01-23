import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SD_Roles } from '../../Utilities/SD';

import { 
    useUpdateCommentMutation,
    useDeleteCommentMutation
 } from '../../APIs/commentApi';
import { toastNotify } from '../../Helper';


const Comment = ({comment}) => {
    const loggedInUser = useSelector((state)=> state.userAuthStore);
    const [editing, setEditing] = useState(false);
    const [commentInput, setCommentInput] = useState(comment.content);
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleUpdateComment = async ()=>{
        
        if(commentInput.trim() === ""){
            toastNotify("can not set value to empty!", "error");
        }else{
            try{

                let updateRequest = {
                    appUser: {
                        id: loggedInUser.id,
                        role:[loggedInUser.role]
                    },
                    newComment: commentInput
                }
                // console.log('new comment: ', commentInput.trim())
                // console.log('comment id : ', comment.id)

                let response = await updateComment({ cmtId: comment.id,updateRequest });
                if(response.data.isSuccess){
                    toastNotify(response.data.message, "success");
                    setEditing(false);
                }else{
                    toastNotify(response.data.message, "error");
                }
            }catch(ex)
            {
                toastNotify(ex, "error");
            }
        }
        
    }

    const handleCancelEdit = ()=>{
        setCommentInput(comment.content);
        setEditing(false);
    }


    const handleDeleteComment = async ()=>{
        try{
            let appUser = {
                id: loggedInUser.id,
                role: [loggedInUser.role]
            }
            let response = await deleteComment({cmtId: comment.id, appUser});
            toastNotify(response.data.message,`${response.data.isSuccess? 'success': 'error'}`)
        }catch(ex){
            toastNotify(ex, "error")
        }
    }

  return (
    <div className='col-12 mt-2 p-3 comment' style={{backgroundColor:'var(--accent-color-bg)'}}>
        <i className='d-block'>{comment.authorName} میگوید : </i>
        {!editing ? 
        <p className='p-3 mt-2' style={{whiteSpace:'pre-wrap'}}><strong>{comment.content}</strong></p>
        :
        <textarea className='form-control p-3 mt-2'
            onChange={(e)=> setCommentInput(e.target.value)}
            value={commentInput}
            rows={5}
            
        ></textarea>
        }

        <hr />
        {loggedInUser.id ? 
            (
            <div className='d-flex gap-2 px-2 align-items-center comment-toolbar'
            >
                {/* <i className='bi bi-reply-fill text-success'
                style={{fontSize:'30px', cursor: 'pointer'}}
                ></i> */}
                {(comment.authorId === loggedInUser.id || loggedInUser.role === SD_Roles.ADMIN) && (
                    !editing? 
                    <>
                    <i onClick={handleDeleteComment} className='bi bi-trash3 me-auto delete-button' style={{fontSize:'20px'}}></i>
                    <i onClick={()=> setEditing(true)} className='bi bi-pencil-square mx-2 edit-button' style={{fontSize:'20px'}}></i>
                    </>:
                    <>
                    <i onClick={handleUpdateComment} className='bi bi-check-lg me-auto apply-edit-button' style={{fontSize:'25px'}}></i>
                    <i onClick={handleCancelEdit} className='bi bi-x mx-2 cancel-edit-button' style={{fontSize:'25px'}}></i>
                    </>
                )}      
            </div>
            ):(<></>)
        }                
    </div>
  )
}

export default Comment
