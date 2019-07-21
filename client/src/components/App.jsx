import React from "react";
import Header from "./Overview/Header/Header.jsx";
import SearchInput from "./Overview/Search/SearchInput.jsx";
import OverviewResults from "./Overview/OverviewResults.jsx";
import FilterSearchResult from "./Overview/Search/FilterSearchResult.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResult: FilterSearchResult("", 20)
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  handleSearchChange(event) {
    this.setState({
      filteredResult: FilterSearchResult(event.target.value, 20)
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
