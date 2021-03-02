import React from "react"

import LoadingSpinner from "../uiComponents/LoadingSpinner"

const RankingList = props => {

  let content = <div className="flex flex-row">
                  <LoadingSpinner /> Loading results...
                </div>;

  if (!props.isLoading) {
    content = (
      <div>


        <table className="rankings font-rubik text-sm">

          <thead className="font-bold text-left">
            <tr>
              <th className="pos px-3 py-1">#</th>
              <th className="name px-3 py-1">Name</th>
              <th className="result px-3 py-1">Result</th>
              <th className="competition px-3 py-1">Competition</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {props.rankings.map((cuber, i) => {
              return (
                <tr key={cuber.wca_id}>
                  <td className="pos px-3 py-1">{i + 1}</td>
                  <td className="name px-3 py-1">{cuber.person_name}</td>
                  <td className="result px-3 py-1"> {cuber.value}</td>
                  <td className="competition px-3 py-1">{cuber.competition.name}</td>
                  <td></td>
                </tr>
              )
            })} 
          </tbody>

        </table>


      </div>
    )
  }

  return content;
}

export default RankingList
