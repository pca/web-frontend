import React, { useState, useEffect } from "react"

import axios from "axios"

import { useLocation } from "@reach/router"
import queryString from "query-string"

import getYear from "date-fns/getYear"
import parseJSON from "date-fns/parseJSON"

import RegionSelect from "./RegionSelect"
import LoadingSpinner from "../uiComponents/LoadingSpinner"

  
const LoginPrompt = props => {

    //THIS BLOCK has to do with logic that will handle user's actions
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [userRegion, setUserRegion] = useState("NCR");
    const [canUserChangeRegion, setCanUserChangeRegion] = useState(false);
    const [statusOfTheUsersRequest, setStatusOfTheUsersRequest] = useState("Loading...");

    const logOut = event => {
      setPcaApiKey(null);
      localStorage.removeItem("localPcaApiKey");
    };

    const userRegionChange = event => {
      setUserRegion(event.target.value);
    };

    const submitRegion = event => {

      const options = {
        headers: {
          "Authorization": `Token ${localStorage.getItem("localPcaApiKey")}`
        }
      };

      axios.post("https://thingproxy.freeboard.io/fetch/https://api.pinoycubers.org/user/region-update-requests/", { region: userRegion }, options)
      .then((response) => {
        setSubmitted(true);
      }, (error) => {
        setSubmitError(true);
        console.log(error);
      });

    };


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

    useEffect(() => {
      
      //try retrieving PcaApiKey from localStorage once, to check if user already has it
      setPcaApiKey(localStorage.getItem("localPcaApiKey"))

      //try getting a PCA API key if user redirected with WCA code 
      if (localStorage.getItem("localPcaApiKey") == null) {

        axios.post("https://cors-anywhere.herokuapp.com/https://api.pinoycubers.org/auth/login/wca/", wcaCode)
          .then(res => {
            localStorage.setItem("localPcaApiKey",Object.values(res.data));
            setPcaApiKey(localStorage.getItem("localPcaApiKey"));
          })
          .then().catch((error) => {
            console.error(error.response);
          })
      }

    }, []);


    // once the login key exists - get the user's details
    useEffect(() => {

      if (localStorage.getItem("localPcaApiKey")) {

        const options = {
          headers: {
            "Authorization": `Token ${localStorage.getItem("localPcaApiKey")}`
          }
        };

        axios.get("https://thingproxy.freeboard.io/fetch/https://api.pinoycubers.org/user/", options)
        .then((response) => {
            setCurrentUser(response);
            checkIfCanChangeRegion(response);
        }, (error) => {
          console.log(error);
        });

      }

    }, [pcaApiKey, statusOfTheUsersRequest]);


    const checkIfCanChangeRegion = user => {

      //GET user's region-update-requests from API
      const options = {
        headers: {
          "Authorization": `Token ${localStorage.getItem("localPcaApiKey")}`
        }
      };

      axios.get("https://cors-anywhere.herokuapp.com/https://api.pinoycubers.org/user/region-update-requests/", options)
      .then((response) => {
        setStatusOfTheUsersRequest(response.data[0]?.status);
      }, (error) => {
        console.log(error);
      });

      //determining if user should be able to change region. first condition checks if user already updated their region this year
      let canChange = false;
      const dateUpdated = user.data.region_updated_at ? user.data.region_updated_at : user.data.created_at;
      const yearToday = getYear(new Date());

      if ((getYear(parseJSON(dateUpdated)) !== yearToday) || (user.data.region == null && statusOfTheUsersRequest === undefined)) {
        canChange = true;
      }
      setCanUserChangeRegion(canChange);

    };


    const userInfo = currentUser 
      ? <React.Fragment>
          <h3 className="text-lg leading-6 font-medium text-gray-800">
            Hello, {currentUser.data.first_name ? `${currentUser.data.first_name} ` : null}
            {currentUser.data.last_name ? currentUser.data.last_name : null} 
            ({currentUser.data.wca_id ? currentUser.data.wca_id : null})!
            <span 
              className="underline text-sm ml-2 cursor-pointer" 
              onClick={()=>{logOut()}}
            >
              Log out
            </span>
          </h3>
          <p className="mt-1 mb-1 font-bold text-sm leading-5 text-gray-500">
            Your current region: {currentUser.data.region ? currentUser.data.region : "No region yet"}
          </p>
          <p className="mt-1 mb-3 font-bold text-sm leading-5 text-gray-500">
            Your region request's status: {statusOfTheUsersRequest ? statusOfTheUsersRequest : "No request yet"}
          </p>
        </React.Fragment> 
      : <React.Fragment>
          <div className="flex flex-row">
            <LoadingSpinner /> Loading your data...
          </div>
          <span 
            className="underline text-sm ml-2 cursor-pointer" 
            onClick={()=>{logOut()}}
          >
            Log out
          </span>
        </React.Fragment>;


    const userRegionControls = canUserChangeRegion
      ? <div className="mt-3 mb-1 flex justify-start items-end flex-wrap sm:flex-no-wrap">
          <RegionSelect 
            regionChange={userRegionChange}
            placeholder="Select region"
          />
          <button 
            className="h-10 px-3 ml-2 text-white transition-colors duration-300 bg-blue rounded-md focus:shadow-outline hover:bg-blue-800 focus:bg-blue-800"
            onClick={()=>{submitRegion()}}
          >
            Set your region
          </button>
        </div>
      : null;


    const guideText = (statusOfTheUsersRequest === "Denied")
      ? <React.Fragment>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Sorry, your request has been denied because we cannot verify your region. <br/>You must e-mail us at <strong>pcaresultscommittee@gmail.com</strong>, and make the subject of the e-mail <strong>"Region update request appeal: (Your full name)".</strong> <br/> In the e-mail, you must give us as much as you can your proof of residence / origin in your selected region.
          </p>
        </React.Fragment> 
      : <React.Fragment>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Please keep in mind: 
            Pick only your REAL region. Our team will verify this, and may deny your submission if found false.
          </p> 
          <p className="mt-1 text-sm leading-5 text-gray-500">
            You can only set your region once every year, so please double check if it's correct before submitting.
          </p>  
        </React.Fragment>;
      

    let content = "";

    if (pcaApiKey != null && !submitted) {

      content = (
        <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">

              {userInfo}

              {guideText} 

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
                Thanks for submitting your region! Please wait up to a week or two for your region setting to be approved.
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
                Error: Can't submit region
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                A network/system error may have happened, or your request has been denied as you may have already set your region for this year. You can only set your region once every year.
              </p>

            </div>
          </div>
        </div>
      )

    } else {

      if (props.hideLoginPrompt) {
        content = "";
      } else {
        content = (
          <div className="login-prompt bg-yellow-100 mx-4 my-5 px-4 py-5 border border-yellow-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap relative">

              <button 
                className="absolute top-0 -right-3 cursor-pointer text-xl"
                onClick={() => props.setHideLoginPrompt(true)}>&times;
              </button>

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
    }

  return content;
}

export default LoginPrompt
