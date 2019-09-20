import React from 'react';
import ReportCard from './ReportCard.jsx';
import axios from 'axios';
import ReportCardView from './ReportCardView.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import OpenFormButton from './OpenFormButton.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      personInfo: [],
      certifications: [],
      loaded: false
    }
  }
  
  // componentDidMount() {
  //   axios.get(`/api/person/${id}`)
  //     .then((response) => {
  //       this.setState({personInfo: response.data.data, loaded:true})
  //     })
  //     .catch((error) => {
  //       console.log("error", error)
  //     })
  // }

  render() {
    const { personInfo, loaded } = this.state;
    // const { personInfo, certifications, loaded } = this.state;
    return (
        <div>
            <ReportCardView />
        </div>
      )
  }
}
export default App;