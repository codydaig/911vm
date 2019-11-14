import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import pages from './../pages/index'
import ReportCardView from './ReportCardView.jsx';
import DashboardView from './DashboardView.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={pages.Volunteers} />
          <Route path="/reportcard/:id" exact component={ReportCardView} />
          <Route path="/dashboard" exact component={DashboardView} />
        </Router>
      </div>
    )
  }
}
export default App;