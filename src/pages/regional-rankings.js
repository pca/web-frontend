import React, { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/layout"
import LoginPrompt from "../components/rankingComponents/LoginPrompt"
import RankingNav from "../components/rankingComponents/RankingNav"
import RankingList from "../components/rankingComponents/RankingList"
import "@fontsource/rubik"
import { PCA_API_URL } from "../constants"
import { getWithExpiry, setWithExpiry } from "../utils/cache"

const TWENTY_MINUTES = 1000 * 60 * 20 // 20 minutes in milliseconds

async function* rankingsFetcher(cacheKey, apiUrl) {
  // First try cache
  const { value: cachedData, isExpired } = getWithExpiry(cacheKey)
  
  if (cachedData) {
    // Always show cached data first without loading state
    yield { data: cachedData, isLoading: false, hasAttemptedLoad: true }
    
    // If data is expired, fetch new data in background
    if (isExpired) {
      try {
        const { data } = await axios.get(apiUrl)
        // Only update if the data is different
        if (JSON.stringify(data) !== JSON.stringify(cachedData)) {
          setWithExpiry(cacheKey, data, TWENTY_MINUTES)
          yield { data, isLoading: false, hasAttemptedLoad: true }
        }
      } catch (error) {
        console.error('Error fetching rankings:', error)
      }
    }
  } else {
    // No cache, show loading state
    yield { data: null, isLoading: true, hasAttemptedLoad: false }
    try {
      const { data } = await axios.get(apiUrl)
      setWithExpiry(cacheKey, data, TWENTY_MINUTES)
      yield { data, isLoading: false, hasAttemptedLoad: true }
    } catch (error) {
      console.error('Error fetching rankings:', error)
      yield { data: null, isLoading: false, hasAttemptedLoad: true }
    }
  }
}

const RegionalRankings = ({ location }) => {
  const [selectedEvent, setSelectedEvent] = useState("333")
  const [selectedFormat, setSelectedFormat] = useState("single")
  const [selectedRegion, setSelectedRegion] = useState(["national", "/"])
  const [hideLoginPrompt, setHideLoginPrompt] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
  const [rankings, setRankings] = useState(null)

  useEffect(() => {
    const cacheKey = `rankings-${selectedRegion[0]}-${selectedFormat}-${selectedRegion[1]}-${selectedEvent}`
    const apiUrl = `${PCA_API_URL}/rankings/${selectedRegion[0]}-${selectedFormat}${selectedRegion[1]}${selectedEvent}`
    
    const fetchData = async () => {
      const generator = rankingsFetcher(cacheKey, apiUrl)
      
      // Handle initial state (either cached or loading)
      const initialState = (await generator.next()).value
      setRankings(initialState.data)
      setIsLoading(initialState.isLoading)
      setHasAttemptedLoad(initialState.hasAttemptedLoad)
      
      // If we need to fetch new data
      if (initialState.isLoading || initialState.data === null) {
        const { value } = await generator.next()
        if (value) {
          setRankings(value.data)
          setIsLoading(value.isLoading)
          setHasAttemptedLoad(value.hasAttemptedLoad)
        }
      }
    }

    fetchData()
  }, [selectedEvent, selectedFormat, selectedRegion])

  const eventChange = event => {
    setSelectedEvent(event)
    setHideLoginPrompt(true)
  }

  const formatChange = format => {
    setSelectedFormat(format)
    setHideLoginPrompt(true)
  }

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
    setSelectedRegion([nationalOrRegional, formattedRegion])
    setHideLoginPrompt(true)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Layout>
        <div className="max-w-1340 mx-auto min-h-[80vh]">
          <LoginPrompt
            hideLoginPrompt={hideLoginPrompt}
            setHideLoginPrompt={setHideLoginPrompt}
            location={location}
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
          <div className="min-h-[500px] overflow-y-auto">
            <RankingList 
              isLoading={isLoading} 
              rankings={rankings}
              hasAttemptedLoad={hasAttemptedLoad}
            />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default RegionalRankings
