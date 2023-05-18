import React, { useState, useEffect } from "react"

import axios from "axios"

import queryString from "query-string"

import getYear from "date-fns/getYear"
import parseJSON from "date-fns/parseJSON"

import LoginPromptContainer from "./LoginPromptContainer"
import RegionSelect from "./RegionSelect"
import LoadingSpinner from "../uiComponents/LoadingSpinner"

import wcaLogo from "../../images/wca-logo.svg"
import { PCA_API_URL } from "../../constants"

const LoginPrompt = props => {
  //THIS BLOCK has to do with logic that will handle user's actions
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [origin, setOrigin] = useState("/")

  const [currentUser, setCurrentUser] = useState(null)
  const [userRegion, setUserRegion] = useState("NCR")
  const [canUserChangeRegion, setCanUserChangeRegion] = useState(false)
  const [userHasWcaId, setUserHasWcaId] = useState(false);
  const [statusOfTheUsersRequest, setStatusOfTheUsersRequest] = useState(
    "Loading..."
  )

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setOrigin(window.location.origin)

      console.log("${origin}")
      console.log(origin)
    }
  }, [])

  const logOut = event => {
    setPcaApiKey(null)
    localStorage.removeItem("localPcaApiKey")
  }

  const userRegionChange = event => {
    setUserRegion(event.target.value)
  }

  const submitRegion = event => {
    const options = {
      headers: {
        Authorization: `Token ${localStorage.getItem("localPcaApiKey")}`,
      },
    }

    axios
      .post(
        `${PCA_API_URL}/user/region-update-requests/`,
        { region: userRegion },
        options
      )
      .then(
        response => {
          setSubmitted(true)
        },
        error => {
          setSubmitError(true)
          console.log(error)
        }
      )
  }

  //THIS BLOCK has to do with WCA code & PCA login key retrieval
  const getWcaCode = query => {
    if (query) {
      const queriedParams = queryString.parse(query)
      return queriedParams
    }
  }

  const [pcaApiKey, setPcaApiKey] = useState(null)

  const { location } = props
  const code = (location.search && getWcaCode(location.search)) || "no code"
  const [wcaCode, setWcaCode] = React.useState(code)

  useEffect(() => {
    //try retrieving PcaApiKey from localStorage once, to check if user already has it
    setPcaApiKey(localStorage.getItem("localPcaApiKey"))

    //try getting a PCA API key if user redirected with WCA code
    if (localStorage.getItem("localPcaApiKey") == null && wcaCode) {
      axios
        .post(`${PCA_API_URL}/auth/login/wca/`, wcaCode)
        .then(res => {
          localStorage.setItem("localPcaApiKey", Object.values(res.data))
          setPcaApiKey(localStorage.getItem("localPcaApiKey"))
          console.log("res:")
          console.log(res)
        })
        .then()
        .catch(error => {
          console.error(error.response)
        })
    }
  }, [])

  // once the login key exists - get the user's details
  useEffect(() => {
    if (localStorage.getItem("localPcaApiKey")) {
      const options = {
        headers: {
          Authorization: `Token ${localStorage.getItem("localPcaApiKey")}`,
        },
      }

      axios.get(`${PCA_API_URL}/user/`, options).then(
        response => {
          setCurrentUser(response)
          checkIfCanChangeRegion(response)
        },
        error => {
          console.log(error)
        }
      )
    }
  }, [pcaApiKey, statusOfTheUsersRequest])

  const checkIfCanChangeRegion = user => {

    //GET user's region-update-requests from API
    const options = {
      headers: {
        Authorization: `Token ${localStorage.getItem("localPcaApiKey")}`,
      },
    }

    axios.get(`${PCA_API_URL}/user/region-update-requests/`, options).then(
      response => {
        setStatusOfTheUsersRequest(response.data[0]?.status)
      },
      error => {
        console.log(error)
      }
    )

    //determining if user should be able to change region. first condition checks if user already updated their region this year
    let canChange = false;
    let hasWcaId = false;
    let userAlreadySetRegion = false;

    const dateUpdated = user.data.region_updated_at ? user.data.region_updated_at : null;
    const yearToday = getYear(new Date());

    console.log("user.data:")
    console.log(user.data)

    if (((getYear(parseJSON(dateUpdated)) !== yearToday) && (user.data.region != null)) || (user.data.region == null && statusOfTheUsersRequest === undefined && user.data.wca_id != null)) {
      canChange = true;
    }
    if (user.data.wca_id != null) {
      hasWcaId = true;
    }
    if (user.data.region != null) {
      userAlreadySetRegion = true;
    }
    if ((statusOfTheUsersRequest === "Pending") || (statusOfTheUsersRequest === "Denied")) {
      canChange = false;
    }

    setCanUserChangeRegion(canChange);
    setUserHasWcaId(hasWcaId);
    props.setHideLoginPrompt(userAlreadySetRegion);
  }

  const userInfo = currentUser ? (
    <React.Fragment>
      <h3 className="text-2xl leading-6 font-medium font-effra">
        Hello,{" "}
        {currentUser.data.first_name ? `${currentUser.data.first_name} ` : null}
        {currentUser.data.last_name ? currentUser.data.last_name : null}(
        {currentUser.data.wca_id ? currentUser.data.wca_id : null})!
        <span
          className="underline text-sm ml-2 cursor-pointer"
          onClick={() => {
            logOut()
          }}
        >
          Log out
        </span>
      </h3>
      <p className="mt-2 mb-1 font-bold text-sm leading-5">
        Your current region:{" "}
        {currentUser.data.region ? currentUser.data.region : "No region yet"}
      </p>
      <p className="mt-1 mb-3 font-bold text-sm leading-5">
        Your region request's status:{" "}
        {statusOfTheUsersRequest ? statusOfTheUsersRequest : "No request yet"}
      </p>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="flex flex-row mx-5">
        <LoadingSpinner /> Loading your data...
      </div>
      <span
        className="underline text-sm ml-2 cursor-pointer"
        onClick={() => {
          logOut()
        }}
      >
        Log out
      </span>
    </React.Fragment>
  )

  const userRegionControls = canUserChangeRegion ? (
    <div className="mt-3 mb-1 flex justify-start items-end flex-wrap sm:flex-no-wrap">
      <RegionSelect
        regionChange={userRegionChange}
        labelText="What region are you from in the Philippines?"
        placeholder="Select region"
      />
      <button
        className="h-10 px-3 ml-2 text-white transition-colors duration-300 bg-blue rounded-md focus:shadow-outline hover:bg-blue-800 focus:bg-blue-800"
        onClick={() => {
          submitRegion()
        }}
      >
        Submit your region
      </button>
    </div>
  ) : null


  const noWcaIdMessage = userHasWcaId
    ? null 
    : <React.Fragment>
        <p className="mt-1 text-sm leading-5">
          <strong> Oops! <br/>You don't have a WCA ID connected to your WCA account yet. </strong> <br/> To get a WCA ID, you must have finished competing in at least one WCA competition. 
        </p>
      </React.Fragment>;


  const guideText =
    statusOfTheUsersRequest === "Denied" ? (
      <React.Fragment>
        <p className="mt-1 text-sm leading-5">
          Sorry, your request has been denied because we cannot verify your
          region. <br />
          You must e-mail us at <strong>pcadevteam@gmail.com</strong>,
          and make the subject of the e-mail{" "}
          <strong>"Region update request appeal: (Your full name)".</strong>{" "}
          <br /> In the e-mail, you must give us as much as you can your proof of residence / origin in your selected region.
        </p>
      </React.Fragment>
    ) : statusOfTheUsersRequest === "Pending" ? (
      <React.Fragment>
        <p className="mt-1 text-sm leading-5">
          You've already submitted a request. For now, you can only wait for your request to be processed.<br />
          You may e-mail us at <strong>pcadevteam@gmail.com</strong>,
          for any concerns.{" "}
        </p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <p className="mt-1 text-sm leading-5">
          Please keep in mind: Pick only your REAL region. Our team will verify this, and may deny your submission if found false.
        </p>
        <p className="mt-1 text-sm leading-5">
          You can only set your region once every year, so please double check if it's correct before submitting.
        </p>
      </React.Fragment>
    )

  let content = ""

  if (pcaApiKey != null && !submitted) {
    content = (
      <LoginPromptContainer 
        hideLoginPrompt={props.hideLoginPrompt}
        setHideLoginPrompt={props.setHideLoginPrompt}
      >
        {userInfo}

        {guideText}

        {userRegionControls}

        {noWcaIdMessage}
      </LoginPromptContainer>
    )
  } else if (submitted) {
    content = (
      <LoginPromptContainer
        hideLoginPrompt={props.hideLoginPrompt}
        setHideLoginPrompt={props.setHideLoginPrompt}
      >
        <h3 className="text-lg leading-6 font-medium">
          You've submitted your region
        </h3>
        <p className="mt-1 text-sm leading-5">
          Thanks for submitting your region! Please wait up to a week or so for
          your region setting to be approved. Feel free to visit this page again
          to check your submission's status.
        </p>
      </LoginPromptContainer>
    )
  } else if (submitError && !submitted) {
    content = (
      <LoginPromptContainer
        hideLoginPrompt={props.hideLoginPrompt}
        setHideLoginPrompt={props.setHideLoginPrompt}
      >
        <h3 className="text-lg leading-6 font-medium">
          Error: Can't submit region
        </h3>
        <p className="mt-1 text-sm leading-5">
          Your request has been denied as you may have already set your region for this year. 
          You can only set your region once every year.
          A network/system error may have happened, please let us know on our e-mail at <strong>pcadevteam@gmail.com</strong>.
        </p>
      </LoginPromptContainer>
    )
  } else {
    content = (
      <LoginPromptContainer
        hideLoginPrompt={props.hideLoginPrompt}
        setHideLoginPrompt={props.setHideLoginPrompt}
      >
        <div>
          <h3 className="font-effra text-2xl leading-6 font-medium">
            Want to see your regional rank here?
          </h3>
          <p className="mt-3 text-sm leading-5">
            If you've competed in an official WCA competition before, you can easily set your region in just a few steps.
          </p>
        </div>

        <div className="mt-4 flex-shrink-0">
          <span className="inline-flex rounded-md shadow-sm">
            <a
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md bg-yellow hover:bg-orange focus:outline-none focus:shadow-outline"
              href={`https://www.worldcubeassociation.org/oauth/authorize/?client_id=6751d55b9b1cc5710fed3a47d9c69eca871af9b0f83ec5388a5b0cebe1f93037&redirect_uri=${origin}/regional-rankings&response_type=code&scope=`}
            >
              <img
                className="h-5 mr-2"
                src={require("../../images/wca-logo.svg")}
              />
              Login with WCA
            </a>
          </span>
        </div>
      </LoginPromptContainer>
    )
  }

  return content
}

export default LoginPrompt
