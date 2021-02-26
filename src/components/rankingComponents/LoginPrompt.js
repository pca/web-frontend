import React, { useState, useEffect } from "react"

import axios from "axios"

import { useLocation } from "@reach/router"
import queryString from "query-string"

import getYear from "date-fns/getYear"
import parseJSON from "date-fns/parseJSON"

import RegionSelect from "./RegionSelect"

// import "./LoginPrompt.scss"


const LoginPrompt = props => {

    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [userRegion, setUserRegion] = useState("NCR");
    const [canUserChangeRegion, setCanUserChangeRegion] = useState(false);

    const userRegionChange = event => {
      setUserRegion(event.target.value);
    };

    const submitRegion = event => {

      console.log("submitting user region...");
      const options = {
        headers: {
          "Authorization": `Token ${localStorage.getItem("localPcaApiKey")}`
        }
      };

      axios.put("https://thingproxy.freeboard.io/fetch/https://pinoycubers.org/api/user/region/", { region: userRegion }, options)
      .then((response) => {
        setSubmitted(true);
      }, (error) => {
        setSubmitError(true);
        console.log("error happened");
        console.log(error);
      });

    };

    const checkIfCanChangeRegion = user => {

      let canChange = false;
      const dateChanged = user.data.region_updated_at ? user.data.region_updated_at : user.data.created_at;
      console.log("user.data.region_updated_at: " + user.data.region_updated_at);
      console.log("user.data.created_at: " + user.data.created_at);
      const yearToday = getYear(new Date());
      console.log("dateChanged: " + dateChanged);
      console.log("yearToday: " + yearToday);
      console.log("getYear(new Date()): " + getYear(new Date()));
      console.log("getYear(dateChanged): " + getYear(dateChanged));
      console.log("parseJSON(dateChanged): " + parseJSON(dateChanged));
      if (getYear(parseJSON(dateChanged)) !== yearToday) {
        canChange = true;
      } else {        
        console.log("year today is the same year as year changed");
      }

      setCanUserChangeRegion(canChange);

    };

    //TODO: "thanks for submitting, wait to be approved" message

    //TODO: hide region form if already set for the year

    //TODO: check if user already has region, and inform if they can/can't change(?)

    //THIS BLOCK has to do with WCA code & PCA login key retrieval 
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


    // once user has login key - get the user's details
    useEffect(() => {

      if (localStorage.getItem("localPcaApiKey")) {

        console.log("localPcaApiKey is NOT null: getting user info...");

        const options = {
          headers: {
            "Authorization": `Token ${localStorage.getItem("localPcaApiKey")}`
          }
        };

        axios.get("https://thingproxy.freeboard.io/fetch/https://pinoycubers.org/api/user/", options)
        .then((response) => {
            setCurrentUser(response);
            checkIfCanChangeRegion(response);
            console.log("currentUser: " + JSON.stringify(currentUser));
        }, (error) => {
          console.log(error);
        });

      }

    }, [pcaApiKey]);


    const userInfo = currentUser 
      ? <React.Fragment>
          <h3 className="text-lg leading-6 font-medium text-gray-800">
            Hello, {currentUser.data.first_name ? `${currentUser.data.first_name} ` : null}
            {currentUser.data.last_name ? currentUser.data.last_name : null} 
            ({currentUser.data.wca_id ? currentUser.data.wca_id : null})!
            <span className="underline text-sm ml-2">Log out</span>
          </h3>
          <p className="mt-1 mb-3 font-bold text-sm leading-5 text-gray-500">
            Your current region: {currentUser.data.region ? currentUser.data.region : "not yet set"}
          </p>
        </React.Fragment> 
      : ' ';


    const userRegionControls = canUserChangeRegion
      ? <div className="mt-3 flex justify-start content-end flex-wrap sm:flex-no-wrap">
          <RegionSelect 
            regionChange={userRegionChange}
            placeholder="Select region"
          />
          <button 
            className="h-10 mb-3 px-3 text-blue-100 transition-colors duration-300 bg-blue-700 rounded-md focus:shadow-outline hover:bg-blue-800 focus:bg-blue-800"
            onClick={()=>{submitRegion()}}
          >
            Set your region
          </button>
        </div>
      : <div className="mt-3 flex justify-start content-end flex-wrap sm:flex-no-wrap">You've already set your region for this year. Wait until next year to be able to set it again.</div>;

    let content = "";

    if (pcaApiKey != null && !submitted) {

      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">

              {userInfo}

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Please keep in mind: 
                Pick only your REAL region. Our team will verify this, and will reject your submission if found false. 
              </p> 
              <p className="mt-1 text-sm leading-5 text-gray-500">
                (If you think your region setting has been rejected incorrectly, contact the nearest active Philippine WCA Delegate to you, and provide proof of residence or origin in your region.)
              </p> 
              <p className="mt-1 text-sm leading-5 text-gray-500">
                You can only set your region once every year, so please check if it's correct before submitting.
              </p>  

              {userRegionControls}

            </div>
          </div>
        </div>
      )

    } else if (submitted) {

      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">

              <h3 className="text-lg leading-6 font-medium text-gray-800">
                You've submitted your region
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Thanks for submitting your region! Please wait for your region setting to be approved.
              </p> 
            </div>
          </div>
        </div>
      )

    } else if (submitError && !submitted) {

      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">

              <h3 className="text-lg leading-6 font-medium text-gray-800">
                You've already submitted your region this year
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                You can only set your region once every year.
              </p> 
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
