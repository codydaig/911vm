import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReportCard from './ReportCard.jsx';

class App extends React.Component {
  render() {
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
}
export default App;