import React from "react";
import axios from "axios";
import Header from "./Overview/Header/Header.jsx";
import SearchInput from "./Overview/Search/SearchInput.jsx";
import OverviewResults from "./Overview/OverviewResults.jsx";
import FilterSearchResult from "./Overview/Search/FilterSearchResult.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResult: [],
      volunteerList: [],
      selectedVolunteer: {}
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.selectOneVolunteer = this.selectOneVolunteer.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
  }

  componentDidMount() {
    this.getAllVolunteers();
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
        console.log(error);
      })
  }

  // query volunteer information for each individual volunteer with their id
  selectOneVolunteer(id) {
    axios.get(`http://localhost:3030/api/person/${id}`)
      .then(res => {
        this.setState({
          selectedVolunteer: res.data.data
        }, () => {
          const { selectedVolunteer } = this.state;
          console.log(`Name: ${selectedVolunteer["first_name"]} ${selectedVolunteer["last_name"]}\n\
Admin Status: ${selectedVolunteer["is_admin"]}\n\
Volunteer Status: ${selectedVolunteer["is_volunteer"]}`)
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

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

  render() {
    return (
      <div>
        <Header/>
        <SearchInput
          textChange={this.handleSearchChange}
          clearSearchInput={this.clearSearchInput}
        />
        <OverviewResults
          searchedData={this.state.filteredResult}
          selectedVolunteer={this.state.selectedVolunteer}
          selectOneVolunteer={this.selectOneVolunteer}
        />
      </div>
    );
  }
}

export default App;