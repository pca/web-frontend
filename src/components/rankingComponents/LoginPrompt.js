import React from "react"

// import './LoginPrompt.scss'


const LoginPrompt = props => {

  // const [listOfEvents, setListOfEvents] = useState([]);

    let content = "";

    if (!props.isLoggedIn) {
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
                <a type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-100 bg-white hover:bg-orange focus:outline-none focus:shadow-outline" href="https://www.worldcubeassociation.org/oauth/authorize/?client_id=6751d55b9b1cc5710fed3a47d9c69eca871af9b0f83ec5388a5b0cebe1f93037&redirect_uri=http://localhost:8000/wca/callback&response_type=code&scope=">
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
