import React from 'react';
import ReportCard from './ReportCard.jsx';
import personInfo from '../../911vmDataDump/chris.json'
import personData from '../../911vmDataDump/chris_certs.json'
/* 
Gotcha. When they fix those issues, the end goal for your task is to make mock queries with the name or ID of a volunteer,
 and populate the report card on the webpage with the queried return data.
*/


class App extends React.Component {
//assuming queries are made in app level/passed back to app level and response data passed down to <ReportCard> component via onclick function
render() {
  // const completePersonData = {...personInfo, ...personData};
    return (
      <div>
        <h1>911 Volunteer Management</h1>
        <p></p>
      <ReportCard personInfo={personInfo.data} personData={personData}/>
      </div>
    )
  }
}

export default App;