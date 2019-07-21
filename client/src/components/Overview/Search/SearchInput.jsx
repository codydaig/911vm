import React from "react";
import PropTypes from "prop-types";

import "../../../../Styles/SearchInput.css";

class SearchInput extends React.Component {
  // static propTypes = {
  //   textChange: PropTypes.func
  // };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default SearchInput;