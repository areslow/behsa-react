import React, { useState ,useEffect } from 'react';
import { useGetSpiegelFeedQuery } from '../../APIs/feedApi';
import { MainLoader } from '../Common';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

//css
import 'swiper/css/effect-fade';
import './feed.css'
import { useNavigate } from 'react-router-dom';

const Spiegel = () => {
    //const navigate = useNavigate();
    //const [newData,setNewData] = useState(JSON.parse(localStorage.getItem("spiegel-feed")))
    const { data, isLoading } = useGetSpiegelFeedQuery();
    //console.log(newData)
    // useEffect(()=>{
    //     if(data && data.isSuccess){
    //         //localStorage.setItem("spiegel-feed",JSON.stringify(data.result));
    //         console.log(data.result)
    //     }
    // },[data]);

  return (
    <div className={`feed-container mx-5`}> {/*${(data && !data.isSuccess )&& 'd-none'}*/}
        {(!data || !data.isSuccess || isLoading)? 
        <MainLoader 
            style ={{
                color: 'var(--accent-color)',
                width: '4rem',
                height: '4rem'
             }}
        /> : 
        <div className='h-100'>
            <div className='feed-header px-4 py-2 d-flex justify-content-center align-items-center'
                 
            >
                {/* <h4>{data.result.description.text}</h4> */}
                <a className='col-6 col-md-4' href={data.result.links[0].uri}><img className='col-12'  src={data.result.imageUrl} alt='..' />
                </a>
                <i className='mt-auto text-success'
                    style={{position:'absolute', bottom:'2px'}}
                >
                {data.result.lastUpdatedTime}</i>
            </div>
            <div className='feed-body'>
                <Swiper
                    modules = {[Pagination, Navigation, EffectFade, Autoplay]}
                    slidesPerView={1}
                    // style={{backgroundColor: 'blue', height: '100%'}}
                    loop = {true}
                    effect='fade'
                    fadeEffect={{crossFade: true}}
                    speed={600}
                    autoplay = {{
                        delay: 5000,
                    }}
                    pagination = {{
                        el:".feed-pagination",
                        type:"bullets",
                        clickable: true,
                    }}      
                >
                    {data.result.items.map((item,index)=>(
                        <SwiperSlide key={index}>
                            <div className='bg-costum row justify-content-center' style={{direction:'ltr'}}>
                                <div className='col-11 col-md-6 d-flex pt-4 px-4 flex-column' >
                                    <a href={`${item.id}`} target='blank'><h5>{item.title.text}</h5></a>
                                    <p style={{whiteSpace:'wrap'}}>{item.summary.text}</p>
                                </div>
                                <div className='col-12 col-md-6 mb-2 mb-md-0 d-flex align-items-center justify-content-center'>
                                    <img src={`${item.links[1].uri}`} alt='' className='' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="feed-pagination mt-2  d-flex justify-content-center"></div>
            </div> 
        </div>
        }
        
    </div>
  )
}

export default Spiegel
