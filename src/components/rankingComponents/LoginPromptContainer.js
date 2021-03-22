import React from "react"


const LoginPromptContainer = ({ children }) => {


  return (
    <div className="login-prompt bg-yellow-100 font-rubik mx-4 my-5 px-4 py-5 border-4 border-yellow sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <div className="ml-4 mt-4">

          {children}

        </div>
      </div>
    </div>
  )
}

export default LoginPromptContainer
