import React from 'react'

const MiniLoader = ({color = "success", size = "100%"}) => {
  return (
    <div>
        <div 
          className={`spinner-border text-${color}`}
          style={{scale: size}}
          >
        </div>
    </div>
  )
}

export default MiniLoader
