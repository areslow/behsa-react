import React from 'react'

const MainLoader = (props) => {
  return (
    <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <div className='spinner-border'
             style={{...props.style}}
        ></div>
    </div>
  )
}

export default MainLoader
