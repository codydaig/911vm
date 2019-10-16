import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import pages from './../pages/index'
import ReportCardView from './ReportCardView.jsx';
import Dashboard from './Dashboard.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={pages.Volunteers} />
          <Route path="/reportcard/:id" exact component={ReportCardView} />
        </Router>
        {/* <ReportCard personInfo={personInfo} /> */}
        <Dashboard />
      </div>
    )
  }
}
export default App;