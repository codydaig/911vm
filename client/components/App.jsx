import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReportCard from './ReportCard.jsx';

//placeholder id
const id = '168c8651-e8db-40ee-8d94-fffde18c0ed3';

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
          <Router>
            <Route path="/reportcard/:id" exact component={ReportCard} />
          </Router>
          {/* <ReportCard personInfo={personInfo} /> */}
        </div>
      )
    }
    return null;
  }
}
export default App;