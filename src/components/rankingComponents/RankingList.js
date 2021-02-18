import React, { useState } from 'react'

const RankingList = props => {

  // const [isLoading, fetchedData] = useHttp('/api/rankings/national-average/333/', []);
  // console.log(JSON.stringify(fetchedData));

    let content = <p>Loading...</p>;

    if (!props.isLoading) {
      content = (
        <div>


          <table className="rankings font-rubik text-sm">

            <thead className="font-bold text-left">
              <tr>
                <th className="pos px-3 py-1">#</th>
                <th className="name px-3 py-1"> <a href="/persons/2015DUYU01">Name</a> </th>
                <th className="result px-3 py-1">Result </th>
                <th className="country px-3 py-1"> <span className="flag-icon flag-icon-cn"></span> </th>
                <th className="competition px-3 py-1"> <span className="flag-icon flag-icon-cn"></span>Competition</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {props.rankings.map((cuber, i) => {
                return (
                  <tr key={cuber.wca_id}>
                    <td className="pos px-3 py-1"> {i + 1} </td>
                    <td className="name px-3 py-1"> <a href="/persons/2015DUYU01">{cuber.person_name}</a> </td>
                    <td className="result px-3 py-1"> {cuber.value} </td>
                    <td className="country px-3 py-1"> <span className="flag-icon flag-icon-cn"></span> </td>
                    <td className="competition px-3 py-1"> <span className="flag-icon flag-icon-cn"></span>{cuber.competition.name}</td>
                    <td></td>
                  </tr>
                )
              })} 
            </tbody>
          </table>



          <table className="table-auto rankings">


            <tbody>

              <tr>
                <td className="px-4 py-2 text-emerald-600 font-medium">Intro to CSS</td>
                <td className="px-4 py-2 text-emerald-600 font-medium">Adam</td>
                <td className="px-4 py-2 text-emerald-600 font-medium">858</td>
              </tr>

            </tbody>

          </table>


        </div>
      )
    }

  return content;
}

export default RankingList
