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

    if (!props.isLoading) {
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





        </div>
      )
    }

  return content;
}

export default RankingNav
