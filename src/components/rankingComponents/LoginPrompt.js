import React, { useState, useEffect } from "react"

import axios from "axios"

import { useLocation } from "@reach/router";
import queryString from "query-string";

import RegionSelect from "./RegionSelect"

// import "./LoginPrompt.scss"


const LoginPrompt = props => {

    const userRegionChange = event => {

    };

    const submitRegion = event => {

    };


    const getWcaCode = (query) => {
      if (query) {
        const queriedParams = queryString.parse(query);
        return queriedParams;
      }
    };

    const [pcaApiKey, setPcaApiKey] = useState(null);

    const location = useLocation();
    const code = (location.search && getWcaCode(location.search)) || "no code";
    const [wcaCode, setWcaCode] = React.useState(code);

    console.log("wcaCode:" + JSON.stringify(wcaCode));
    console.log("pcaApiKey: " + pcaApiKey);

    useEffect(() => {
      
      //try retrieving PcaApiKey once, to check if user already has it
      setPcaApiKey(localStorage.getItem("localPcaApiKey"))

      console.log("has localPcaApiKey? : " + (localStorage.getItem("localPcaApiKey") ? localStorage.getItem("localPcaApiKey") : "no"));

      if (localStorage.getItem("localPcaApiKey") == null) {

        console.log("no localPcaApiKey - requesting from pinoycubers.org API login POST...")
        axios.post("https://cors-anywhere.herokuapp.com/https://pinoycubers.org/api/auth/login/wca/", wcaCode)
          .then(res => {
          console.log("pinoycubers.org login POST returns: " + JSON.stringify(Object.values(res.data)));

            localStorage.setItem("localPcaApiKey",Object.values(res.data));

            console.log("localPcaApiKey: " + localStorage.getItem("localPcaApiKey"));

            setPcaApiKey(localStorage.getItem("localPcaApiKey"));
            console.log("setPcaApiKey has been set to: " + pcaApiKey);
          })
          .then().catch((error) => {
            console.log("error response: ------");
            console.error(error.response);
          })
      }

    }, []);

    let content = "";

    if (pcaApiKey != null) {
      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">

              <h3 className="text-lg leading-6 font-medium text-gray-800">
                Hello, User!
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Please keep in mind: 
                Pick only your REAL region. Our team will verify this, and will reject your submission if found false. 
              </p> 
              <p className="mt-1 text-sm leading-5 text-gray-500">
                (If you think your region setting has been rejected incorrectly, contact your Philippine WCA Delegate and be prepared to provide proof of residence or origin in your region.)
              </p> 
              <p className="mt-1 text-sm leading-5 text-gray-500">
                You can only set your region once every year.
              </p>  
              <RegionSelect 
                regionChange={userRegionChange}
              />

            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">

            <div className="ml-4 mt-4">
              <h3 className="text-lg leading-6 font-medium text-gray-800">
                Want to see your regional rank here?
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                If you've competed in an official WCA competition before, you can easily set your region in just a few steps.
              </p>
            </div>

            <div className="ml-4 mt-4 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <a type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-100 bg-white hover:bg-orange focus:outline-none focus:shadow-outline" href="https://www.worldcubeassociation.org/oauth/authorize/?client_id=6751d55b9b1cc5710fed3a47d9c69eca871af9b0f83ec5388a5b0cebe1f93037&redirect_uri=http://localhost:8000/regional-rankings&response_type=code&scope=">
                  Login with WCA
                </a>
              </span>
            </div>

          </div>
        </div>
      )
    }

  return content;
}

export default LoginPrompt
