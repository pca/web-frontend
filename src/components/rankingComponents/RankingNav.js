import React, { useState, useEffect  } from "react"

import axios from 'axios'

import ListOfEventsFile from '../../list-of-events.js'

import './RankingNav.scss'


const RankingNav = props => {

  const [listOfEvents, setListOfEvents] = useState([]);

    let content = <p>Loading menu...</p>;

    if (!props.isRegionsLoading) {
      content = (
        <div className="rankings-nav">


          <div className="events-menu">

            {ListOfEventsFile.map(event => {
              return (
                <div className="event-icon" key={event.id} onClick={()=>{props.eventChange(event.id)}}>
                  <img src={require("../../images/" + event.id + ".svg")} />
                </div>
              )
            })} 

          </div>


          <div className="region-menu max-w-xs rounded-md shadow-sm">
            <select 
              className="block form-select w-full rounded-md transition border border-gray-300 px-3 py-2 bg-white duration-150 ease-in-out sm:text-sm sm:leading-5"
              onChange={props.regionChange}
            >

              <option selected
                key="PH"
                value="PH"
              >
                Philippines
              </option>

              {props.regions.map(region => {
                return (

                  <option
                    key={region.id}
                    value={region.id}
                  >
                    {region.name}
                  </option>

                )
              })} 

            </select>
          </div>


          <div className="format-menu inline-flex" role="group" aria-label="Button group">
            <button 
              className="h-10 px-5 text-indigo-100 transition-colors duration-300 bg-indigo-700 rounded-l-md focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
              onClick={()=>{props.formatChange("single")}}
            >
              Single
            </button>
            <button 
              className="h-10 px-5 text-indigo-100 transition-colors duration-300 bg-indigo-700 rounded-r-md focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
              onClick={()=>{props.formatChange("average")}}
            >
              Average
            </button>
          </div>


        </div>
      )
    }

  return content;
}

export default RankingNav
