import React, { useState, useEffect } from "react"

import axios from 'axios'

import Layout from "../components/layout"

import RankingNav from "../components/rankingComponents/RankingNav"
import RankingList from "../components/rankingComponents/RankingList"

import "@fontsource/rubik"

const RegionalRankings = () => {

  const [selectedEvent, setSelectedEvent] = useState("333");
  const [selectedFormat, setSelectedFormat] = useState("single");
  const [selectedRegion, setSelectedRegion] = useState(['national', '/']); 

  const [isLoading, setIsLoading] = useState(true);
  const [isRegionsLoading, setIsRegionsLoading] = useState(true);
  const [rankings, setRankings] = useState(null);
  const [regions, setRegions] = useState(null);


  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/regions`)
      .then(res => {
        const regions = res.data;
        setRegions(regions);
        setIsRegionsLoading(false);
      })
  }, []);

  useEffect(() => {
    console.log(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`)
    axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`)
      .then(res => {
        const rankings = res.data;
        setRankings(rankings);
        setIsLoading(false);
      })
  }, [selectedEvent, selectedFormat, selectedRegion]);


  const eventChange = event => {
    setSelectedEvent(event);
    setIsLoading(true);
    console.log("new selected event: " + event);
  };

  const formatChange = format => {
    setSelectedFormat(format);
    setIsLoading(true);
    console.log("new selected format: " + format);
  };

  const regionChange = event => {
    console.log("event.target.value region: " + event.target.value);
    if (event.target.value == "PH") {
      var formattedRegion = "/"
      var nationalOrRegional = "national"
    } else {
      var formattedRegion = "/" + event.target.value + "/"
      var nationalOrRegional = "regional"
    }
    setSelectedRegion([nationalOrRegional, formattedRegion]);
    console.log("[nationalOrRegional, formattedRegion]: " + [nationalOrRegional, formattedRegion]);
  };
  
  return (
    <div>
      <Layout>

        <RankingNav 
          isRegionsLoading={isRegionsLoading} 
          eventChange={eventChange}
          formatChange={formatChange}
          regionChange={regionChange}
          setSelectedEvent={setSelectedEvent} 
          selectedRegion={selectedRegion}
          regions={regions} 
        />
        <RankingList 
          isLoading={isLoading} 
          isRegionsLoading={isRegionsLoading} 
          rankings={rankings} 
        />

      </Layout>
    </div>
  )

}

export default RegionalRankings
