import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './Storage/Redux/userAuthSlice';

import { ChatHubUrl } from './APIs/apiSettings';

import  JWTDecode  from 'jwt-decode';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


import { 
  Header,
  Footer,
  ScrollTopBtn
 } from './Components/Layout'


import { ChatBox } from './Components/Chat';


import { 
  Home, NotFound, 
  Login, Register,
  CreatePost,
  AccessDenied,
  PostList,
  PostDetails,
  Category,
  //Support,
  CategoryDetails,
  CourseUpsert,
  CourseList,
  ShoppingCart
} from './Pages';


import AOS from 'aos';
import { SD_Roles } from './Utilities/SD';
import { toastNotify } from './Helper';




// import 'swiper/css';





function App() {

  const loggedInUser = useSelector((state) => state.userAuthStore );
  //const chatConnection = useSelector((state) => state.hubConnectionsStore).chatHubConnection;
  const dispatch = useDispatch();

  useEffect(()=>{
          AOS.init();
          const localJWTToken = localStorage.getItem("jwtToken");
          if(localJWTToken){
            const { userName, fullName, id, email, role , exp } = JWTDecode(localJWTToken);
            if(Date.now() < exp * 1000) {
              dispatch(setLoggedInUser({userName, fullName, id, email, role }))
            }
          }
        
      },[dispatch]);
      // useEffect(()=>{
      //   // if user data has changed, i.e. the user has logged in or logged out 
      //   if(userData.id !=='')
      //     console.log('user : ',userData);
      // },[userData]);


//       const [connection, setConnection] = useState(null);

// useEffect(()=>{

//   let con = new HubConnectionBuilder()
//                        .withUrl(ChatHubUrl)
//                        .withAutomaticReconnect()
//                        .build()
//   setConnection(con);
//   if([SD_Roles.ADMIN, SD_Roles.SUPPORT].some((i) => loggedInUser.role.includes(i))){
//     const startConnection = async () => {
//       await connection.start();
      
//       //console.log(connection)
//     }
//     startConnection();
//   }
// },[loggedInUser.role])
  
      
  return (
    <div className="App" style={{position:'relative'}}>
      <ScrollTopBtn />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        
        {/* <Route path='/support' element={<Support connection = { connection } />} /> */}
        <Route path='/access-denied' element={<AccessDenied />} />
        <Route path='/articles' element={<PostList />} />
        <Route path='/articles/:id' element={<PostDetails />}></Route>

        <Route path='/admin/create-post' element={<CreatePost />} />
        {/* <Route path='/admin/categories' element={<CategoryList />} /> */}
        <Route path='/admin/categories' element={<Category />}/>
        <Route path='/admin/category/:id' element = {<CategoryDetails />} />
        <Route path='/admin/course-upsert/:id' element={<CourseUpsert />}/>
        <Route path='/admin/course-upsert' element={<CourseUpsert />}/>
      </Routes>
      <ToastContainer rtl />
      <Footer />
      {/* <ChatBox connection = { connection } /> */}
    </div>
  );
}

export default App;
