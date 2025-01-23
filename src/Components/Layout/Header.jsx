import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import JWT_Decode from 'jwt-decode';
import LogoutBtn from '../Common/LogoutBtn';
import { useSelector } from 'react-redux';


// import { setLoggedInUser, emptyUserState } from '../../Storage/Redux/userAuthSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SD_Roles } from '../../Utilities/SD';


const Header = () => {
  const isSmall = useMediaQuery('(max-width: 1199px)');
  const userData = useSelector((state) => state.userAuthStore );
  const shoppingCart = useSelector((state) => state.shoppingCartStore);
  // const dispatch = useDispatch();
  const [loggedin, setloggedIn] = useState(false);
  const [subMenuOpen, setSubmenuOpen] = useState(false)
  
  useEffect(()=>{
    if(userData.id !== "") setloggedIn(true);
    else setloggedIn(false)
  },[userData]);

  const navigate = useNavigate();
  const mobileNavToogle = (e)=>{
    document.querySelector('body').classList.toggle('mobile-nav-active');
    e.target.classList.toggle('bi-list');
    e.target.classList.toggle('bi-x');
  }

  const toggleSubMenu = () =>{
    setSubmenuOpen(prev => !prev);
  }
  
  const handleNavLinksClick = ()=>{
    document.querySelector('body').classList.remove('mobile-nav-active');
    document.getElementById('mobile-nav-toggle').classList.add('bi-list');
    document.getElementById('mobile-nav-toggle').classList.remove('bi-x');
    setSubmenuOpen(false);
    // window.scrollTo(0,0)
  }

 const [menuShadow, setMenuShadow] = useState(false)
 window.addEventListener('scroll', function(){
    if(window.scrollY > 100) setMenuShadow(true);
    else setMenuShadow(false);
 });

  return (
    <header id="header" className="header d-flex flex-column align-items-center sticky-top"
      style={{boxShadow: `${menuShadow ?'1px 0 2px var(--accent-color)': 'none' }`}}
    >
      <div className='user-tools container-fluid'>
        <div className='d-flex justify-content-end'>
          <Link to='/shopping-cart' className='text-dark text-hover-light' style={{position:'relative'}}>
            
            { shoppingCart.items.length > 0 ?
              <>
                <span style={{position:'absolute', top:'7px', right:'7px',fontSize:'10px', color:'white'}}>{shoppingCart.items.length}</span>
                <i className='bi bi-cart-fill' style={{fontSize:'20px'}}></i>
              </> 
              :
              <i className='bi bi-cart' style={{fontSize:'20px'}}></i>
            }
          </Link>
        </div>
      </div>
      <div className="container-fluid container-xl position-relative d-flex align-items-center">

        <a href="/" className="logo d-flex align-items-center ms-auto">
          {/* <!-- Uncomment the line below if you also wish to use an image logo -->
          <!-- <img src="assets/img/logo.png" alt=""> --> */}
          <h1 className="sitename brand">بهسا</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><NavLink aria-current='page' to='/' onClick={handleNavLinksClick} >خانه<br /></NavLink></li>
            {/* <li><NavLink aria-current='page' to='/teachers'>اساتید</NavLink></li> */}
            <li><NavLink aria-current='page' to='/courses' onClick={handleNavLinksClick}>دوره ها</NavLink></li>
            {/* <li><NavLink aria-current='page' to='/council'>مشاوره</NavLink></li> */}
            
            {/* <li><NavLink aria-current='page' to='/about-us'>درباره ما</NavLink></li> */}
            <li><NavLink aria-current='page' to='/articles' onClick={handleNavLinksClick}>مقالات</NavLink></li>
            <li><NavLink aria-current='page' to='/contact-us' onClick={handleNavLinksClick}>ارتباط با ما</NavLink></li>
            {(userData.role.includes(SD_Roles.ADMIN) || userData.role.includes(SD_Roles.SUPPORT)) && (
              <li><NavLink aria-current='page' to='/support' onClick={handleNavLinksClick}>پشتیبانی</NavLink></li>
            )}
            {/* admin menus */}
            {userData.role.includes(SD_Roles.ADMIN) && (
              <li className={`dropdown ${subMenuOpen && 'active'}`}>
                <button className='w-100' onClick={ isSmall? toggleSubMenu : undefined}>
                  <span className='ms-lg-3 text-success fw-bolder'>مدیریت</span> 
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </button>
                <ul className={`dropdown-menu ${subMenuOpen && 'dropdown-active'}`}>

                  <li><NavLink to="posts" onClick={handleNavLinksClick}>لیست پست ها</NavLink></li>
                  <li><NavLink to="messages" onClick={handleNavLinksClick}>مشاهده پیام ها</NavLink></li>
                  <li><NavLink to="admin/categories" onClick={handleNavLinksClick}>دسته بندی ها</NavLink></li>
                  {!isSmall && <li className='dropdown-divider'></li>}
                  <li><NavLink to="admin/create-post" onClick={handleNavLinksClick}>ایجاد پست جدید</NavLink></li>
                  <li><NavLink to="admin/course-upsert" onClick={handleNavLinksClick}>ثبت دوره جدید</NavLink></li>
                </ul>
              </li>
            )}
            
          </ul>
          <i onClick={mobileNavToogle} id='mobile-nav-toggle' className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        
        {loggedin?  <LogoutBtn /> : (
          <button  className="btn btn-getstarted" href="courses.html"
                 onClick={()=>navigate("/login")}
          >ورود / ثبت نام</button>
        )}

      </div>
    </header>
  )
}

export default Header
