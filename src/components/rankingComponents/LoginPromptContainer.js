import React from "react"


const LoginPromptContainer = ({ hideLoginPrompt, setHideLoginPrompt, children }) => {


  let content = ""

  if (hideLoginPrompt) {
    content = (
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 mx-4 mt-5 border-2 border-yellow text-sm leading-5 font-medium cursor-pointer rounded-md bg-transparent hover:bg-orange focus:outline-none focus:shadow-outline"
        onClick={() => setHideLoginPrompt(false)}
      >
         ⚙️&nbsp; Show your regional settings
      </button>
    )
  } else {
    content = (
      <div className="login-prompt bg-yellow-100 font-rubik text-gray-600 mx-4 my-5 px-6 py-5 border-4 border-yellow">
        <div className="-ml-4 -mt-4 relative flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-4">

            <button
              className="absolute top-0 -right-3 cursor-pointer text-2xl"
              onClick={() => setHideLoginPrompt(true)}
            >
              &times;
            </button>

            {children}

          </div>
        </div>
      </div>
    )
  }

  return content
}

export default LoginPromptContainer
