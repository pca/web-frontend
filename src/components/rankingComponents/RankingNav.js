import React, { useState, useEffect  } from "react"

import axios from 'axios'

import ListOfEventsFile from '../../list-of-events.js'

import './RankingNav.scss'


const RankingNav = props => {

  const [listOfEvents, setListOfEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/events/`)
  //     .then(res => {
  //       const listOfEvents = res.data;
  //       setListOfEvents(listOfEvents);
  //       setIsLoading(false);
  //     })
  // }, []);

    let content = <p>Loading events...</p>;

    if (!props.isLoading && !props.isLoadingRegions) {
      content = (
        <div>


          <div className="events-menu">

            {ListOfEventsFile.map(event => {
              return (
                <div className="event-icon" key={event.id} onClick={()=>{props.eventChange(event.id)}}>
                  <img src={require("../../images/" + event.id + ".svg")} />
                </div>
              )
            })} 

          </div>



          <div className="inline-flex" role="group" aria-label="Button group">
            <button 
              className="h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-l-lg focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
              onClick={()=>{props.formatChange("single")}}
            >
              Single
            </button>
            <button 
              className="h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-r-lg focus:shadow-outline hover:bg-indigo-800 focus:bg-indigo-800"
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
