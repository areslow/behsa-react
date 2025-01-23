import React, { useState } from 'react';
import { MiniLoader } from '../Common';
import { Link } from 'react-router-dom';
import { 
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../APIs/categoryApi';
import { toastNotify } from '../../Helper';

const CategoryItem = ({category}) => {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [nameInput, setnameInput] = useState(category.name)
  const [updateCategory] = useUpdateCategoryMutation(); 
  const [deleteCategory] = useDeleteCategoryMutation();

  
  const handleUpdateCategory = async ()=>{
    setLoading(true)
    if(nameInput.trim() === ""){
      toastNotify("can't send empty name", "error")
      setLoading(false)
    }else{
      try{
        let catg = {
          id: category.id,
          name: nameInput.trim(),
          imagePath: "",
          isDeleted: false
        };
        let response = await updateCategory(catg);
        setLoading(false)
        if(response.data.isSuccess){
          setEditing(false);
          toastNotify(response.data.message);
        }else{
          toastNotify(response.data.message, "error")
        }
      }catch(err)
      {
        toastNotify(err, "error");
      }
    }
  }

  const handleDeleteCategory = async ()=>{
    if(window.confirm("آیا از حذف این آیتم اطمینان دارید‌؟")){
      try{
        let response = await deleteCategory(category.id)
        toastNotify(response.data.message, response.data.isSuccess ? "success": "error")


      }catch(err){
        toastNotify(err, "error")
      }
    }
  }

  return (
    <div className='col-12'>
      <div className='row align-items-center justify-content-center gap-2 border-bottom py-2'>
        <div className='col-12 col-md-6 d-flex'>
          {editing ? 
            <input type='text' name='name' className='form-control' 
              style={{boxShadow:'none', borderColor: 'var(--accent-color)'}}
              value={nameInput}
              onChange={(e)=> setnameInput(e.target.value)}
            />
            :
            <Link to={`/admin/category/${category.id}`} className='col-12' style={{textDecoration:'none'}}>{category.name}</Link>
          }  
        </div>
        <div className='col-12 col-md-3'>
          {editing ? 
          <>
            <button className='btn btn-success'
              disabled = {loading}
              onClick={handleUpdateCategory}
            >
              {loading ? <MiniLoader color='white' size='50%' /> : <i className='bi bi-check'></i>}
            </button>
            <button className='btn btn-secondary'
              onClick={
                ()=>{
                  setEditing(false);
                  setnameInput(category.name)
                }
              }
            >
              <i className='bi bi-x'></i>
            </button>
          </>
          :
          <>
            <button className='btn btn-info'
              onClick={()=>setEditing(true)}
            >
              <i className='bi bi-pencil-square'></i>
            </button>
            <button className='btn btn-danger'
              onClick={handleDeleteCategory}
            >
              <i className='bi bi-trash3'></i>
            </button>
          </>
          }
          
        </div>
      </div>
    </div>
  )
}

export default CategoryItem
