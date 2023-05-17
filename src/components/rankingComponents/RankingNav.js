import React from "react"

import ListOfEventsFile from "../../list-of-events.js"

import RegionSelect from "./RegionSelect"

import "./RankingNav.scss"


const RankingNav = props => {
  
  //sort events in the order of main/popular events first, side events last
  let byRank = ListOfEventsFile.slice(0);
  byRank.sort(function(a,b) {
      return a.rank - b.rank;
  });

  //hide the single/average format selector if the event doesn't have an average ranking
  const formatSelector = (props.selectedEvent === "333mbf")
    ? ""
    : <React.Fragment>

        <div className="format-menu inline-flex font-rubik" role="group" aria-label="Button group">
          <button 
            className={`px-5 py-2 rounded-l-md focus:shadow-outline transition-colors duration-300 ${(props.selectedFormat === "single") ? "bg-blue-dark" : "bg-blue"} hover:bg-blue-dark text-sm text-white`}
            onClick={()=>{props.formatChange("single")}}
          >
            Single
          </button>
          <button 
            className={`px-5 py-2 rounded-r-md focus:shadow-outline transition-colors duration-300 ${(props.selectedFormat === "average") ? "bg-blue-dark" : "bg-blue"} hover:bg-blue-dark text-sm text-white`}
            onClick={()=>{props.formatChange("average")}}
          >
            Average
          </button>
        </div>

      </React.Fragment>;


  return (
    <div className="rankings-nav mx-4 my-5 font-rubik">

      <div className="events-menu flex flex-row flex-wrap">
        {byRank.map(event => {
          if (event.id === "333mbf") {
            return (
              <div 
                className={`event-icon mb-1 cursor-pointer ${(props.selectedEvent === event.id) ? "active" : ""}`} 
                key={event.id} 
                onClick={()=>{props.eventChange(event.id); props.formatChange("single");}}
              >
                <img src={require("../../images/" + event.id + ".svg")} />
              </div>
            )
          //condition: hides events that have been retired from official competitions
          } else if (event.rank < 990) {
            return (
              <div 
                className={`event-icon mb-1 cursor-pointer ${(props.selectedEvent === event.id) ? "active" : ""}`} 
                key={event.id} 
                onClick={()=>{props.eventChange(event.id)}}
              >
                <img src={require("../../images/" + event.id + ".svg")} />
              </div>
            )
          }
        })} 
      </div>

      <RegionSelect 
        styleName="mb-3"
        isRankingNav={true}
        labelText="Region"
        regionChange={props.regionChange}
      />

      {formatSelector}

    </div>
  )
}

export default RankingNav
