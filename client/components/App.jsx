import React from 'react';
import ReportCard from './ReportCard.jsx';
// import personInfo from '../../911vmDataDump/chris.json'
// import personData from '../../911vmDataDump/chris_certs.json'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      personInfo: [],
      personData: [],
      loaded: false
    }
  }

  componentDidMount() {
    axios.get('/api/person/ae503518-d157-4bfb-b5b0-6ad9af547d3e')
      .then((response) => {
        this.setState({personInfo: response.data.data})
      })
      .catch((error) => {
        console.log("error", error)
      })

    axios.get('/api/person/ae503518-d157-4bfb-b5b0-6ad9af547d3e/certification')
      .then((response) => {
        this.setState({personData: response.data, loaded:true})
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  render() {
    const { personInfo, personData, loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <h1>911 Volunteer Management {JSON.stringify(personData)}</h1>
          <p></p>
            <ReportCard personInfo={personInfo} personData={personData}/>
        </div>
      )
    }
    return null;
  }
}
export default App;