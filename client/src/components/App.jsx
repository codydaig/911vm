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
      volunteerList: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.getVolunteers();
  }

  getVolunteers() {
    axios.get(`http://localhost:3030/api/person`)
    .then(res => {
      this.setState({ 
        filteredResult: res.data.data,
        volunteerList: res.data.data
      });
    })
  }

  handleSearchChange(event) {
    this.setState({
      filteredResult: FilterSearchResult(this.state.filteredResult, event.target.value)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput textChange={this.handleSearchChange} />
        <OverviewResults searchedData={this.state.filteredResult} />
      </div>
    );
  }
}

export default App;