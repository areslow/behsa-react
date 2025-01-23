import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({categories}) => {
  return (
    <div className='container'>
        <div className='row gap-2 py-2'>
            {
                (categories !== null && categories.length > 0) ?
                    
                    categories.map((category, index)=>(
                        <CategoryItem category = {category} key={index} />
                    ))
                    :
                    <span>هیج دسته بندی ای ایجاد نشده</span>
            }
        </div>
    </div>
  )
}

export default CategoryList
