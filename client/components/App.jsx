import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReportCard from './ReportCard.jsx';
import Header from "./Overview/Header/Header.jsx";
import SearchInput from "./Overview/Search/SearchInput.jsx";
import OverviewResults from "./Overview/OverviewResults.jsx";
import FilterSearchResult from "./Overview/Search/FilterSearchResult.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      filteredResult: [],
      volunteerList: [],
      certificationList: [],
      selectedVolunteerID: {}
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.selectOneVolunteer = this.selectOneVolunteer.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
  }
  
  componentDidMount() {
    this.getAllVolunteers();
    // axios.get(`http://localhost:3030/api/person/${id}`)
    //   .then((response) => {
    //     this.setState({personInfo: response.data.data, loaded:true})
    //   })
    //   .catch((error) => {
    //     console.error("error", error)
    //   })
  }
  // query all the volunteers, called when loading the page
  getAllVolunteers() {
    axios.get(`http://localhost:3030/api/person`)
      .then(res => {
        this.setState({
          filteredResult: res.data.data,
          volunteerList: res.data.data
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // query volunteer information for each individual volunteer with their id
//   selectOneVolunteer(id) {
//     axios.get(`http://localhost:3030/api/person/${id}`)
//       .then(res => {
//         this.setState({
//           selectedVolunteer: res.data.data
//         }, () => {
//           const { selectedVolunteer } = this.state;
//           console.log(`Name: ${selectedVolunteer["first_name"]} ${selectedVolunteer["last_name"]}\n\
// Admin Status: ${selectedVolunteer["is_admin"]}\n\
// Volunteer Status: ${selectedVolunteer["is_volunteer"]}`)
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//   }
  selectOneVolunteer(volunteer) {
    this.setState({ 
      selectedVolunteer: volunteer,
      loaded: true
    });
  };

  // this function is called as user typing in new characters in the search bar
  handleSearchChange(event) {
    this.setState({
      filteredResult: FilterSearchResult(this.state.filteredResult, event.target.value)
    });
  };

  // when clear search input, regenerate the full list of volunteers to be searchable
  clearSearchInput() {
    this.setState({
      filteredResult: this.state.volunteerList
    })
  }

  backToOverview = () => {
    this.setState(prevState => ({
      loaded: !prevState.loaded,
      filteredResult: prevState.volunteerList
    }));
  }

  render() {
    const { loaded, selectedVolunteer, filteredResult } = this.state;
    if (!loaded) {
      return (
        <div>
          <Header/>
          <SearchInput
            textChange={this.handleSearchChange}
            clearSearchInput={this.clearSearchInput}
          />
          <OverviewResults
            searchedData={filteredResult}
            selectOneVolunteer={this.selectOneVolunteer}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Header/>
          <ReportCard 
            personInfo={selectedVolunteer} 
            backToOverview = {this.backToOverview}  
          />
        </div>
      )
    }
  }
}
export default App;