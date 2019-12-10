import React from 'react';
// import signOffs from "../../911vmDataDump/dashboard";

const Dashboard = ({signOffHeaders, signOffBody}) => {
  let personCerts = [];
  const headers = [];

  return (
    <div>
      <table>
        <thead className="certification_name">
          <tr>
            <th >Volunteer name</th>
            {signOffHeaders.map((header, i) => {
                headers.push(header.name);
                return (
                  <th key={i.toString()}>{header.name} </th>
                )
              })}
          </tr>
        </thead>   
        <tbody>
          {
            signOffBody.map(person => 
              <tr key={person.volunteer.id} >
                <td>{person.volunteer.first_name} {person.volunteer.last_name}</td>
                {
                  person.SignOffs.map((signOff, x) => {
                    return (
                      <td key={x.toString() + person.volunteer.id}>
                        {signOff.signature_date? "x" : '' }
                      </td>
                    )
                  })
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard;
