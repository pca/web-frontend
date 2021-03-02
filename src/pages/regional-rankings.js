import React, { useState, useEffect } from "react"

import axios from "axios"

import Layout from "../components/layout"

import LoginPrompt from "../components/rankingComponents/LoginPrompt"
import RankingNav from "../components/rankingComponents/RankingNav"
import RankingList from "../components/rankingComponents/RankingList"

import "@fontsource/rubik"

const RegionalRankings = () => {

  const [selectedEvent, setSelectedEvent] = useState("333");
  const [selectedFormat, setSelectedFormat] = useState("single");
  const [selectedRegion, setSelectedRegion] = useState(['national', '/']); 
  const [hideLoginPrompt, setHideLoginPrompt] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [rankings, setRankings] = useState(null);


  //reload the rankings everytime a category changes
  useEffect(() => {
    // console.log(`https://thingproxy.freeboard.io/fetch/https://api.pinoycubers.org/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`)
    axios.get(`https://thingproxy.freeboard.io/fetch/https://api.pinoycubers.org/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`)
      .then(res => {
        const rankings = res.data;
        setRankings(rankings);
        setIsLoading(false);
      })
  }, [selectedEvent, selectedFormat, selectedRegion]);


  const eventChange = event => {
    setSelectedEvent(event);
    setIsLoading(true);
    setHideLoginPrompt(true);
    console.log("new selected event: " + event);
  };

  const formatChange = format => {
    setSelectedFormat(format);
    setIsLoading(true);
    setHideLoginPrompt(true);
    console.log("new selected format: " + format);
  };

  const regionChange = event => {
    console.log("event.target.value region: " + event.target.value);
    var formattedRegion = "/"
    var nationalOrRegional = "national"
    if (event.target.value === "PH") {
      formattedRegion = "/"
      nationalOrRegional = "national"
    } else {
      formattedRegion = "/" + event.target.value + "/"
      nationalOrRegional = "regional"
    }
    setSelectedRegion([nationalOrRegional, formattedRegion]);
    setIsLoading(true);
    setHideLoginPrompt(true);
    console.log("[nationalOrRegional, formattedRegion]: " + [nationalOrRegional, formattedRegion]);
  };

  return (
    <div>
      <Layout>

        <LoginPrompt 
          hideLoginPrompt={hideLoginPrompt}
          setHideLoginPrompt={setHideLoginPrompt}
        />
        <RankingNav 
          eventChange={eventChange}
          formatChange={formatChange}
          regionChange={regionChange}
          setSelectedEvent={setSelectedEvent}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <RankingList 
          isLoading={isLoading} 
          rankings={rankings} 
        />

      </Layout>
    </div>
  )

}

export default RegionalRankings
