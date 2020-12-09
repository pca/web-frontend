import React from "react"

const EventCard = props => {
  return (
    <div className="p-3 mb-2 bg-gray font-effra">
      <div className="flex flex-row items-center">
        <div className="mr-2 text-center">
          <p className="text-sm uppercase text-text leading-sm">
            {props.month}
          </p>
          <h3 className="font-bold text-h3 leading-h3 text-dark">
            {props.day}
          </h3>
        </div>

        <div className="pl-2 border-l-2 border-text">
          <p className="mb-2 font-bold leading-body text-body text-dark">
            {props.title}
          </p>
          <p className="mb-2 text-sm text-text leading-sm">{props.place}</p>
          <p
            className={`w-24 text-sm font-bold text-center text-light ${
              props.tag === "Cubemeet" ? "bg-red" : "bg-yellow"
            }`}
          >
            {props.tag}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventCard
