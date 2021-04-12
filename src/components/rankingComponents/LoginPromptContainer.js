import React from "react"


const LoginPromptContainer = ({ children }) => {


  return (
    <div className="login-prompt bg-yellow-100 font-effra text-gray-600 mx-4 my-5 px-6 py-5 border-4 border-yellow">
      <div className="-ml-4 -mt-4 relative flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <div className="ml-4 mt-4">

          {children}

        </div>
      </div>
    </div>
  )
}

export default LoginPromptContainer
