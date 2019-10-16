import React from 'react';
import signOffs from "../../911vmDataDump/dashboard";

const Dashboard = () => {
  const personCerts = {};

  return (
    <div>
      <h1>categories:</h1>
      <div>
        {
          signOffs.data.headers.map((header, i) => {
            return (
              <div className="certification_name" key={i}>{header.name} </div>
            )
          })
        }
      </div>
      <h1>Names</h1>
      {console.log(signOffs)}
      {
        signOffs.data.body.map((person, i) => {
          if (!personCerts[person.volunteer.id]) {
            personCerts[person.volunteer.id] = []
          } else {
            let certs = [];
            person.SignOffs.forEach(cert => {
              certs.push(cert.name);
            });
            personCerts[person.volunteer.id] = certs;
            console.log("PERSON CERTS", personCerts)
          }
          return (
            <div className="table_row">
              <div className="volunteer_person" key={i}>{`${person.volunteer.first_name} ${person.volunteer.last_name}`}</div>
              <div> {
                signOffs.data.headers.map((header, i) => {
                  return (
                    <div className="status_check">
                      x
                    </div>
                  )
                })
              }
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default Dashboard;

