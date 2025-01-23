import React, { useEffect, useState } from 'react';
import { WithAuthAdmin } from '../../HOC';
import { CategoryList } from '../../Components/Category';
import { MiniLoader } from '../../Components/Common';
import { 
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
} from '../../APIs/categoryApi';
import { toastNotify } from '../../Helper';

const Category = () => {

  const [loading, setLoading] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const { data, isLoading } = useGetAllCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async () =>{
    if(categoryInput.trim() === "") toastNotify("can't create empty item", "error");
    else{
      setLoading(true)
      try{
        let catg = {
          name: categoryInput.trim(),
          imagePath: "",
          isDeleted: false
        };
        let response = await createCategory(catg);
        toastNotify(response.data.message, response.data.isSuccess ? "success" : "error");
        response.data.isSuccess && setCategoryInput("")
      }
      catch(err){
        toastNotify(err, "error")
      }
      setLoading(false);
    }
  }
  // useEffect(()=>{
  //   if(data && !isLoading) console.log(data)
  // },[data, isLoading])

  return (
    <main className='main'>
      <section className='section category-list'>
        {data && !isLoading ? 
        <CategoryList categories= {data.result} 
        />
        :
        <div className='container'>
          <div className='row justify-content-center'>
            <MiniLoader />
          </div>
        </div>}
      </section>
      <section className='section category-create'>
        <div className='container'>
            <div className='row align-items-center justify-content-center gap-2'>
                <div className='col-12 col-md-6 px-0'>
                  <input type='text' className='form-control' placeholder='نام دسته...' name='category'
                    style={{boxShadow:'none', borderColor: 'var(--accent-color)', color:'var(--default-color)'}}
                    value={categoryInput}
                    onChange={(e)=> setCategoryInput(e.target.value)}
                  />
                </div>
                <div className='col-12 col-md-3 px-0'>
                  <button className='btn btn-primary col-12 mx-0'
                  disabled = {loading}
                  onClick={handleCreateCategory}
                  >
                    {loading ? <MiniLoader />: <>افزودن</>}
                  </button>
                </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default WithAuthAdmin(Category)
