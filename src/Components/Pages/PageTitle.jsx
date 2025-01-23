import React from 'react'
import { Link } from 'react-router-dom';

const PageTitle = ({title, descriptions, breadcrumbs}) => {
  return (
    <div className="page-title" data-aos="fade">
        <div className="heading">
            <div className="container">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                <h1>{title}</h1>
                <p className="mb-0">
                    {descriptions}
                </p>
                </div>
            </div>
            </div>
        </div>
        <nav className="breadcrumbs">
            <div className="container">
            <ol>
                {breadcrumbs}
            </ol>
            </div>
        </nav>
    </div>
  )
}

export default PageTitle
