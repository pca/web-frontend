import React, { useState, useEffect } from "react"

import axios from "axios"

import LoadingSpinner from "../uiComponents/LoadingSpinner"


const RegionSelect = props => {


    const [regions, setRegions] = useState(null);
    const [isRegionsLoading, setIsRegionsLoading] = useState(true);

    useEffect(() => {
      axios.get(`https://api.pinoycubers.org/regions`)
        .then(res => {
          setRegions(res.data);
          setIsRegionsLoading(false);
        })
    }, []);

    const PhOption = props.isRankingNav ? <option key="PH" value="PH">Philippines</option> : ' ';

    let content = <div className="flex flex-row">
                    <LoadingSpinner /> Loading regions...
                  </div>;

    if (!isRegionsLoading) {
      content = (
        <div id="region-menu" className={`max-w-xs rounded-md ${props.styleName ? props.styleName : ""}`}>
        
          <label htmlFor="region-menu" className="text-sm">Region</label>

          <select 
            className="block form-select w-full rounded-md transition border border-gray-300 px-3 py-2 bg-white duration-150 ease-in-out text-sm sm:leading-5 text-gray-600"
            onChange={props.regionChange}
          >

            {PhOption}

            {regions.map(region => {
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
      )
    }

  return content;
}

export default RegionSelect
