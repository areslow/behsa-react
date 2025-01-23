import React from 'react'

const IconBox = ({icon, title,paragraph}) => {
  return (
    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
      {icon}
      <h4>{title}</h4>
      <p>{paragraph}</p>
    </div>
  )
}

export default IconBox
