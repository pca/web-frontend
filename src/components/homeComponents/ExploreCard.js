import React from "react"

const ExploreCard = props => {
  return (
    <div className="flex justify-between col-span-6 p-8 bg-light font-effra">
      <div className="w-72">
        <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
          {props.page}
        </h3>
        <p className="text-body text-text ">{props.excerpt}</p>
      </div>
      <span className="w-40 opacity-25 bg-text"></span>
    </div>
  )
}

export default ExploreCard
