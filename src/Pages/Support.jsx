import React from 'react';
import { WithAuthAdmin } from '../HOC';





const Support = () => {




  return (
    <main className='main'>
      <section className='section'>
        <div className='container'>
            list of requests
        </div>
      </section>
    </main>
  )
}

export default WithAuthAdmin(Support)
