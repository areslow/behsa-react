import React from 'react'

const EventCard = ({event}) => {
  return (
    <div className="card">
        <div className="card-img">
            <img src={event.image} alt="..." style={{aspectRatio:'1.3'}} />
        </div>
        <div className="card-body">
            <h5 className="card-title"><a href="">{event.title}</a></h5>
            <p className="fst-italic text-center">{event.date}</p>
            <p className="card-text">{event.description}</p>
        </div>
    </div>
  )
}

export default EventCard
