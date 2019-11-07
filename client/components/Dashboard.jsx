import React from 'react';
import signOffs from "../../911vmDataDump/dashboard";

const Dashboard = () => {
  let personCerts = [];
  const headers = [];

  return (
    <div>
      <table className="dashboard">
        <tr>
          <th className="certification_name">Volunteer name</th>
          {signOffs.data.headers.map((header, i) => {
              headers.push(header.name);
              return (
                <th className="certification_name" key={i}>{header.name} </th>
              )
            })}
        </tr>
        {signOffs.data.body.map(person => {
          personCerts = [];
          {person.SignOffs.map(cert => {
            personCerts.push(cert.name);
          })}
          return ( 
            <React.Fragment>
              <tr className="volunteer_row">
                <td className="volunteer_person">{person.volunteer.first_name + " " + person.volunteer.last_name}</td>
                {headers.map((hasThisCert, x) => {
                  return (
                    <td className="status_check" key={x}> {personCerts.includes(hasThisCert)? "x" : null } </td>
                  )
                })}
              </tr>
            </React.Fragment>
            )
        })}
      </table>
    </div>
  )
}

export default Dashboard;
