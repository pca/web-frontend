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
    axios.get(`https://api.pinoycubers.org/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`)
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
  };

  const formatChange = format => {
    setSelectedFormat(format);
    setIsLoading(true);
    setHideLoginPrompt(true);
  };

  const regionChange = event => {
    let formattedRegion = "/"
    let nationalOrRegional = "national"
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
  };

  return (
    <div>
      <Layout>
        <div className="max-w-1340 mx-auto">

          <LoginPrompt 
            hideLoginPrompt={hideLoginPrompt}
            setHideLoginPrompt={setHideLoginPrompt}
          />
          <RankingNav 
            eventChange={eventChange}
            formatChange={formatChange}
            regionChange={regionChange}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            selectedFormat={selectedFormat}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <RankingList 
            isLoading={isLoading} 
            rankings={rankings} 
          />

        </div>
      </Layout>
    </div>
  )

}

export default RegionalRankings
