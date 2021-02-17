import React, { useState, useEffect } from "react"

import axios from 'axios'

import Layout from "../components/layout"

import RankingNav from "../components/rankingComponents/RankingNav"
import RankingList from "../components/rankingComponents/RankingList"

import "@fontsource/rubik"

const RegionalRankings = () => {

  const [selectedEvent, setSelectedEvent] = useState("333");
  const [selectedFormat, setSelectedFormat] = useState("single");
  const [selectedRegion, setSelectedRegion] = useState(); 

  const [isLoading, setIsLoading] = useState(true);
  const [rankings, setRankings] = useState(null);


  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/rankings/national-${selectedFormat}/${selectedEvent}`)
      .then(res => {
        const rankings = res.data;
        setRankings(rankings);
        setIsLoading(false);
      })
  }, [selectedEvent]);


  const eventChange = event => {
    setSelectedEvent(event);
    setIsLoading(true);
    console.log("new selected event: " + event);
  };
  
  return (
    <div>
      <Layout>

        <RankingNav eventChange={eventChange} setSelectedEvent={setSelectedEvent} />
        <RankingList isLoading={isLoading} rankings={rankings} />

      </Layout>
    </div>
  )

}

export default RegionalRankings
