import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import pages from './../pages/index'
import ReportCard from './ReportCard.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={pages.Overview} />
            <Route path="/volunteers" exact component={pages.Volunteers} />
            <Route path="/volunteers/:id" exact component={pages.Volunteer} />
            <Route path="/reportcard/:id" exact component={ReportCard} />            
          </Switch>
          {/* <ReportCard personInfo={personInfo} /> */}
        </div>      
      </Router>
    )
  }
}
export default App;