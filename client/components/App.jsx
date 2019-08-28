import React from 'react';
import ReportCard from './ReportCard.jsx';
// import personInfo from '../../911vmDataDump/chris.json'
// import certifications from '../../911vmDataDump/chris_certs.json'
import axios from 'axios';

//placeholder id
const id = 'ae503518-d157-4bfb-b5b0-6ad9af547d3e';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      personInfo: [],
      certifications: [],
      loaded: false
    }
  }
  
  componentDidMount() {
    axios.get(`/api/person/${id}`)
      .then((response) => {
        this.setState({personInfo: response.data.data, loaded:true})
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  render() {
    const { personInfo, loaded } = this.state;
    // const { personInfo, certifications, loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <h1>911 Volunteer Management</h1>
            <ReportCard personInfo={personInfo} />
        </div>
      )
    }
    return null;
  }
}
export default App;