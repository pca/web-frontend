import React, { useState } from 'react'

const RankingList = props => {

  // const [isLoading, fetchedData] = useHttp('/api/rankings/national-average/333/', []);
  // console.log(JSON.stringify(fetchedData));

    let content = <p>Loading...</p>;

    if (!props.isLoading) {
      content = (
        <div>


          <table className="rankings">

            <thead>
              <tr>
                <th className="px-4 py-2 text-emerald-600">Title</th>
                <th className="px-4 py-2 text-emerald-600">Author</th>
                <th className="px-4 py-2 text-emerald-600">Views</th>
              </tr>
            </thead>

            <tbody>
              {props.rankings.map((cuber, i) => {
                return (
                  <tr key={cuber.wca_id}>
                    <td className="pos"> {i + 1} </td>
                    <td className="name"> <a href="/persons/2015DUYU01">{cuber.person_name}</a> </td>
                    <td className="result"> {cuber.value} </td>
                    <td className="country"> <span className="flag-icon flag-icon-cn"></span> </td>
                    <td className="competition"> <span className="flag-icon flag-icon-cn"></span>{cuber.competition.name}</td>
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
