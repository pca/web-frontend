import React, { useState } from "react"

import ListOfEventsFile from "../../list-of-events.js"

import RegionSelect from "./RegionSelect"

import "./RankingNav.scss"


const RankingNav = props => {

  const [isRankingNav, setIsRankingNav] = useState(true);
  
  //sort events in the order of main/popular events first, side events last
  let byRank = ListOfEventsFile.slice(0);
  byRank.sort(function(a,b) {
      return a.rank - b.rank;
  });

  console.log(ListOfEventsFile.sort);
  return (
    <div className="rankings-nav mx-4 my-5">


      <div className="events-menu mb-3">

        {byRank.map(event => {
          //this condition hides events that have been removed from official competitions
          if (event.rank < 990) {
            return (
              <div className="event-icon cursor-pointer" key={event.id} onClick={()=>{props.eventChange(event.id)}}>
                <img src={require("../../images/" + event.id + ".svg")} />
              </div>
            )
          }
        })} 

      </div>


      <RegionSelect 
        styleName="mb-3"
        isRankingNav={true}
        regionChange={props.regionChange}
      />


      <div className="format-menu inline-flex" role="group" aria-label="Button group">
        <button 
          className="h-10 px-5 text-white transition-colors duration-300 bg-blue rounded-l-md focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
          onClick={()=>{props.formatChange("single")}}
        >
          Single
        </button>
        <button 
          className="h-10 px-5 text-white transition-colors duration-300 bg-blue rounded-r-md focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
          onClick={()=>{props.formatChange("average")}}
        >
          Average
        </button>
      </div>


    </div>
  )
}

export default RankingNav
