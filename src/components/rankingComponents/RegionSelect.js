import React, { useState, useEffect } from "react"
import axios from "axios"
import LoadingSpinner from "../uiComponents/LoadingSpinner"
import { PCA_API_URL } from "../../constants"
import { getWithExpiry, setWithExpiry } from "../../utils/cache"

const CACHE_KEY = 'regions'
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365 // 1 year in milliseconds

const RegionSelect = props => {
  const [regions, setRegions] = useState(null)
  const [isRegionsLoading, setIsRegionsLoading] = useState(false)

  useEffect(() => {
    const fetchRegions = async () => {
      // Try to get from cache first
      const { value: cachedRegions, isExpired } = getWithExpiry(CACHE_KEY)
      
      if (cachedRegions) {
        setRegions(cachedRegions)
        setIsRegionsLoading(false)

        // If expired, fetch new data in background
        if (isExpired) {
          try {
            const { data } = await axios.get(`${PCA_API_URL}/regions`)
            setRegions(data)
            setWithExpiry(CACHE_KEY, data, ONE_YEAR)
          } catch (error) {
            console.error('Error fetching regions:', error)
          }
        }
        return
      }

      // Only show loading if we have no cached data
      setIsRegionsLoading(true)
      try {
        const { data } = await axios.get(`${PCA_API_URL}/regions`)
        setRegions(data)
        setWithExpiry(CACHE_KEY, data, ONE_YEAR)
      } catch (error) {
        console.error('Error fetching regions:', error)
      }
      setIsRegionsLoading(false)
    }

    fetchRegions()
  }, [])

  const PhOption = props.isRankingNav ? (
    <option key="PH" value="PH">
      Philippines
    </option>
  ) : (
    " "
  )

  return (
    <div id="region-menu" className={`max-w-xs ${props.styleName ? props.styleName : ""}`}>
      <label htmlFor="region-select" className="text-sm block mb-1">
        {props.labelText}
      </label>
      <div className="relative">
        <select
          id="region-select"
          className={`
            block w-full rounded-md px-3 py-2 text-sm
            border border-gray-300 bg-white
            appearance-none cursor-pointer
            disabled:bg-gray-50 disabled:cursor-not-allowed
            transition duration-150 ease-in-out
            ${isRegionsLoading ? 'pl-10' : ''}
          `}
          onChange={props.regionChange}
          onBlur={props.regionChange}
          disabled={isRegionsLoading}
        >
          {isRegionsLoading ? (
            <option value="">Regions...</option>
          ) : (
            <>
              {PhOption}
              {Array.isArray(regions) && regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </>
          )}
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Loading spinner overlay */}
        {isRegionsLoading && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  )
}

export default RegionSelect
