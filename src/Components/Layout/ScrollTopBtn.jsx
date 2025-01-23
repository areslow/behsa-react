import React, { useState} from 'react'

const ScrollTopBtn = () => {
    const [active, setActive] = useState(false);
    document.addEventListener('scroll',()=>{
        window.scrollY > 100 ? setActive(true) : setActive(false);
    });

    const handleClick = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    }
  return (
    <button onClick={handleClick} id="scroll-top" className={`scroll-top d-flex align-items-center justify-content-center ${active && 'active'}`}>
        <i className="bi bi-arrow-up-short"></i>
    </button>
  )
}

export default ScrollTopBtn
