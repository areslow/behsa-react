import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItemFromCart } from '../Storage/Redux/shoppingCartSlice';

const ShoppingCart = () => {
    const shoppingCart = useSelector((state) => state.shoppingCartStore);
    const dispatch = useDispatch();
    return (
    <main className='main'>
      <section className='section shopping-carrt'>
        <div className='container'>
            {shoppingCart.items.length > 0 ?
                <div className='p-3'> 
                    {shoppingCart.items.map((item, index) => (
                    <div key={index} className='row border-bottom mt-3 p-2 justify-content-start' style={{fontSize:'15px'}}>
                        <div className='col'><Link to={``} style={{textDecorationLine:'none'}}>{item.name}</Link></div>
                        <div className='col'>{item.description}</div>
                        <div className='col'>{item.price.toLocaleString()} تومان</div>
                        <div className='col'>
                            <button className='btn btn-sm btn-danger'
                                onClick={()=>dispatch(removeItemFromCart(item))}
                            ><i className='bi bi-dash'></i></button>
                        </div>
                    </div>
                    ))}
                    <div className='row justify-content-end mt-5'>
                        <button className='btn btn-primary col-md-2'>پرداخت</button>
                    </div>
                </div>
                :
                <div className='text-center'>
                    <span>سبد خرید شما خالی است.</span>
                    <Link to='/courses'>مشاهده لیست دوره</Link>
                </div>
            }
            
        </div>
      </section>
    </main>
  )
}

export default ShoppingCart
