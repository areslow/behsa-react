import React from 'react';
import { IMAGE_ROOt } from '../../Utilities/SD';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SD_Roles } from '../../Utilities/SD';
import { useDispatch } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../Storage/Redux/shoppingCartSlice';



const CourseCard = ({course}) => {
  const loggedInUser = useSelector((state) => state.userAuthStore);
  const shoppingCart = useSelector((state) => state.shoppingCartStore);
  const dispatch = useDispatch();

  return (
    <div className="course-item" style={{position:'relative'}}>
      {!shoppingCart.items.some(item => item.id === course.id) ? 
        <button className='btn btn-primary rounded-0'
          style={{position:'absolute', top:'10px', left:'10px'}}
          onClick={() => dispatch(addItemToCart(course))}
        ><i className='bi bi-cart-plus'></i></button>
        :
        <button className='btn btn-danger rounded-0'
          style={{position:'absolute', top:'10px', left:'10px'}}
          onClick={()=>dispatch(removeItemFromCart(course))}
        ><i className='bi bi-cart-dash'></i></button>
      }
      

      {(loggedInUser.id && loggedInUser.role.includes(SD_Roles.ADMIN)) &&
        <Link to={`/admin/course-upsert/${course.id}`} className='btn btn-warning rounded-0' style={{position:'absolute', top:'10px', right:'10px'}}>
          <i className='bi bi-pencil-square'></i>
        </Link>
      }
      
      <img src={course.imageName ? `${course.imageName}`:
      'https://placehold.jp/854x854.png'} className="img-fluid" alt="..." /> {/* src={course.courseImage} */}
      <div className="course-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="category"style={{cursor: 'default'}}>{course.categoryName}</p>
          <p className="price">{course.price} تومان</p>
        </div>

        <h3><Link to={`/course-details/${course.id}`}>{course.name}</Link></h3>
        <p className="description">{course.description}</p>
        <div className="trainer d-flex justify-content-between align-items-center">
          <div className="trainer-profile d-flex align-items-center">
            <img src='https://placehold.jp/40x40.png' className="img-fluid" alt="" /> {/*src={course.trainer.image} */}
            {/* <a href={`trainers/${course.trainer.id}`} className="trainer-link">{course.trainer.name}</a> */}
          </div>
          <div className="trainer-rank d-flex align-items-center">
            <i className="bi bi-person user-icon"></i>&nbsp;20
            &nbsp;&nbsp;
            <i className="bi bi-heart heart-icon"></i>&nbsp;85
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
