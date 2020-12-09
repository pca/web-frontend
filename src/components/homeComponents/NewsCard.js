import React from "react"

const EventCard = props => {
  return (
    <div className="flex items-center justify-between mb-6 font-effra">
      <div className="max-w-xl">
        <h3 className="mb-2 text-subtitle font-effraMd leading-subtitle text-dark">
          Philippine Cubers Association
        </h3>
        <p className="text-body leading-body text-text">
          {props.excerpt}...
          <span className="font-bold">
            <a href="/"> Read More</a>
          </span>
        </p>
      </div>

      <div className="opacity-25 w-28 h-28 bg-text"></div>
    </div>
  )
}

export default EventCard
