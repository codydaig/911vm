import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import pages from './../pages/index'
import ReportCardView from './ReportCardView.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>911 Volunteer Management</h1>
        <Router>
          <Route path="/" exact component={pages.Volunteers} />
          <Route path="/reportcard/:id" exact component={ReportCardView} />
        </Router>
        {/* <ReportCard personInfo={personInfo} /> */}
      </div>
    )
  }
}
export default App;