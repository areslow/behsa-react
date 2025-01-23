// modules and libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Storage'

import GLightbox from 'glightbox';
import Swiper from 'swiper';










// styles >> css
import './Assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'swiper/css';

// js

import 'bootstrap/dist/js/bootstrap';
//import './Assets/js/main';


//components
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
