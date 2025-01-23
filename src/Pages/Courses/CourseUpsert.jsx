import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../../APIs/categoryApi';
import { 
  useGetProductByIdQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation,
  useDeleteProductMutation 
} from '../../APIs/productApi';
import { MiniLoader } from '../../Components/Common';
import { inputHelper, toastNotify } from '../../Helper';
import { IMAGE_ROOt } from '../../Utilities/SD';

const courseData = {
  name : "",
  description: "",
  categoryId: "",
  price : 0,
}

const CourseUpsert = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false); // determin if we are updating an existing item or creating new item
  const [deleteBtnState, setDeleteBtnState] = useState(false);
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [courseInputs, setCourseInputs] = useState(courseData);
  const [imageToStore, setImageToStore] = useState();
  const [imageToDisplay, setImageToDisplay] = useState();
  const [loading, setLoading] = useState(false); // display a miniloader while proccessing update or create request
  const categories = useGetAllCategoryQuery();
  useEffect(()=>{
    if(!id && categories.data && categories.data.result && !categories.isLoading){
      setCourseInputs({...courseInputs, categoryId: categories.data.result[0].id});
      console.log('categories : ', categories.data)
    }
  },[categories.data, categories.isLoading]);
//&& categories.data.result
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // useEffect(()=>{
  //   if(categories.data && !categories.isLoading){
  //     console.log(categories.data)
  //   }
  // },[categories.data, categories.isLoading])

  // an effect to set initial state of form inputs if there is an id provided in params
  useEffect(()=>{
    if(data && data.result){
      setCourseInputs({
        name: data.result.name,
        description: data.result.description,
        categoryId: data.result.categoryId,
        price : data.result.price,
      });
      setIsUpdate(true)
      setImageToDisplay(`${data.result.imageName}`);
      console.log('course data: ', data.result)
    }
  },[data])


  const handleCourseInputs = (e) => {
    const tempData = inputHelper(e, courseInputs);
    setCourseInputs(state => {return tempData});
    // console.log(courseInputs)
  }

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    if(!imageToStore && !id){
      toastNotify("please Upload an image...", "error");
      setLoading(false);
      return;
    }
    // check the validation of inputs here (later ...)

    const formData = new FormData();
    formData.append("Name", courseInputs.name);
    formData.append("Description", courseInputs.description);
    formData.append("Price", courseInputs.price);
    formData.append("CategoryId", courseInputs.categoryId);
    if(imageToStore) formData.append("Image", imageToStore)
      let response; // the response for api call to updating or creating new product
    if(id){
      // update
      formData.append("Id", id);
      response = await updateProduct(formData);
    }
    else{
      response = await createProduct(formData);
    }
    if(response && response.data) {
      toastNotify(response.data.message, `${response.data.isSuccess ? "success" : "error"}`);
      response.data.isSuccess && navigate("/courses");
    }
    setLoading(false)
  }

  const handleFileChange = (e) =>{
    const file = e.target.files && e.target.files[0];
    
    if(file){
      const fileType = file.type.split("/")[0];
      if(file.size > 2000 * 1024){
        // if file size is more than 2mb display an error
        setImageToStore("");
        toastNotify("file size must be less than 2MB", "error");
        return;
      }
      if(fileType !== "image"){
        setImageToStore("");
        toastNotify("Invalid file type. please select an image file", "error");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result;
        setImageToDisplay(imgUrl);
      }
    }
  }

  
  const handleRemoveItem = async (e) => {
    e.preventDefault();
    setDeleteBtnState(true)
    if(window.confirm("continue to delete ?")){
      let response = await deleteProduct(id);
      if(response && response.data){
        toastNotify(response.data.message, `${response.data.isSuccess ? "success" : "error"}`);
        response.data.isSuccess && navigate("/courses")
      }
    }
    setDeleteBtnState(false);
  }

  return (
    <main className='main'>
       <section className='section course-upsert'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <form method='post' className='form' onSubmit={handleFormSubmit} encType='multipart/form-data'>
                  <input type='text' 
                    name='name' className='form-control' 
                    placeholder='نام دوره'
                    value={courseInputs.name}
                    onChange={handleCourseInputs}
                    required
                  />
                  <textarea className='form-control from-select mt-2'
                      name='description'
                      value={courseInputs.description}
                      onChange={handleCourseInputs} 
                      placeholder='توضیحات'
                      required
                      rows={3}
                  ></textarea>
                  <div className='col-12 mt-2 d-flex'>
                  {categories.isLoading ? <MiniLoader /> :
                    categories.data && categories.data.result ? 
                      <select className='form-control'
                          name='categoryId'
                          value={courseInputs.categoryId}
                          onChange={handleCourseInputs} 
                      >
                        {categories.data.result.map((catg, index)=>{
                          return (<option key={index} value={catg.id}>{catg.name}</option>)
                        })}
                      </select>
                       :
                       ( 
                        <div className=' col-12 p-2 border'>دسته بندی وجود ندارد
                          <Link to='/admin/categories' className='me-2' style={{textDecoration:'none'}}>ایجاد دسته بندی جدید</Link>
                        </div>
                       )
                  }
                  </div>
                  <input type='number' name='price' className='form-control my-2' min={0} placeholder='قیمت'
                         value={courseInputs.price}
                         onChange={handleCourseInputs}
                         required
                  />
                  <span style={{fontSize:'14px'}}>انتخاب تصویر محصول</span>
                  <input type='file' className='form-control mt-1'
                    onChange={handleFileChange}
                  />
                  <div className='row gap-1 px-0 mx-0'>
                    <button type='submit' className='btn btn-primary mt-2 mx-0 col-12 rounded-0'
                      disabled={loading}
                    >
                    {
                      loading ? 
                        <MiniLoader color='white' /> 
                        : 
                        <>{isUpdate ? <>دخیره تغیرات</> : <>ثبت محصول</> }</>
                      }
                    </button>
                  </div>
                </form>
                {(data && data.result && console.log(data.result)) && 
                    <button className='btn btn-danger mt-2 mx-0 col-12 rounded-0'
                      onClick={handleRemoveItem}
                      disabled = {deleteBtnState}
                    >
                    حذف  
                    </button>
                }
              </div>
              <div className='col-md-5 mt-2 mt-md-0'>
              {imageToDisplay && <img className='img-fluid' src={imageToDisplay} alt='...' />}
                
              </div>
            </div>
          </div>
       </section>
    </main>
  )
}

export default CourseUpsert
