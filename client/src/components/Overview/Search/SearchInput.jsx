import React from "react";
import PropTypes from "prop-types";

import "../../../../Styles/SearchInput.css";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // TODO: when click on backspace, not a fresh set of list of volunteers will be rendered.
  handleChange(event) {
    this.props.textChange(event);
    if (event.target.value === "") {
      this.props.clearSearchInput();
    }
  };

  render() {
    return (
      <div className = "component-search-input">
        <div>
          <input onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default SearchInput;