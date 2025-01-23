import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryByIdQuery } from '../../APIs/categoryApi';
import { useGetProductsByCategoryQuery } from '../../APIs/productApi';
import { MiniLoader } from '../../Components/Common';
import { CategoryItem } from '../../Components/Category';
import { NotFound } from '../../Pages';
import { CourseCard } from '../../Components/Common';

const CategoryDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetCategoryByIdQuery(id);
    const productsResult = useGetProductsByCategoryQuery(id);
    useEffect(()=>{
        if(productsResult.data && !productsResult.isLoading) console.log(productsResult.data)
    }, [productsResult.data, productsResult.isLoading]);
  return (
    <main className='main'>
        
            {data && data.isSuccess ? 
                <section className='section category-details'>
                    <div className='container'>
                        <CategoryItem category={data.result} />
                        <div className='row mt-3'>
                            {productsResult.data && productsResult.data.isSuccess && productsResult.data.result.length > 0 ?
                                productsResult.data.result.map((product, index)=>(
                                    <div key={index} className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                                        <CourseCard course={product} key={index} />
                                    </div>
                                ))
                                :
                                <i className=''>محصولی یافت نشد</i>
                            }
                        </div>
                    </div>
                    
                </section>
            :
             !isLoading && <NotFound />
            }
    </main>
  )
}

export default CategoryDetails
