import React from "react"
import LoadingSpinner from "../uiComponents/LoadingSpinner"

const RankingList = props => {
  let content = (
    <div className="rankings-container px-3 md:px-0 min-h-[400px]">
      <div className="table-responsive">
        <table 
          className="rankings-list font-rubik text-sm w-full"
          aria-label="Rankings List"
        >
          <caption className="sr-only">Cubing Rankings</caption>
          <thead className="font-bold text-left">
            <tr>
              <th scope="col" className="pos px-3 py-1">#</th>
              <th scope="col" className="name px-3 py-1">Name</th>
              <th scope="col" className="result px-3 py-1">Result</th>
              <th scope="col" className="competition px-3 py-1">Competition</th>
              <th scope="col" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {props.isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <LoadingSpinner /> 
                    <span className="ml-2">Loading results...</span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {props.rankings?.map((cuber, i) => (
                  <tr key={cuber.wca_id}>
                    <td className="pos px-3 py-1 text-gray-600">{i + 1}</td>
                    <td className="name px-3 py-1 text-gray-600">{cuber.person_name}</td>
                    <td className="result px-3 py-1 font-black text-gray-600">{cuber.value}</td>
                    <td className="competition px-3 py-1 text-gray-600">{cuber.competition.name}</td>
                    <td></td>
                  </tr>
                ))}
                {props.hasAttemptedLoad && !props.rankings?.length && (
                  <tr>
                    <td></td>
                    <td className="pos px-3 py-1">No results yet for this category.</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  return content
}

export default RankingList
