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
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [rankings, setRankings] = useState(null);
  const [regions, setRegions] = useState(null);



  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/regions`)
      .then(res => {
        const regions = res.data;
        setRegions(regions);
        setIsLoadingRegions(false);
      })
  }, []);

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/rankings/national-${selectedFormat}/${selectedEvent}`)
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

  const regionChange = region => {
    setSelectedRegion(region);
    setIsLoadingRegions(true);
    console.log("new selected region: " + region);
  };
  
  return (
    <div>
      <Layout>

        <RankingNav 
          eventChange={eventChange}
          formatChange={formatChange}
          regionChange={regionChange}
          setSelectedEvent={setSelectedEvent} 
          regions={regions} 
        />
        <RankingList 
          isLoading={isLoading} 
          isLoadingRegions={isLoadingRegions} 
          rankings={rankings} 
        />

      </Layout>
    </div>
  )

}

export default RegionalRankings
