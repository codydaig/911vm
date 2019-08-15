import React from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

import OverviewResultsRow from "./OverviewResultsRow.jsx";
import "../../../Styles/OverviewResults.css";

export default class OverviewResults extends React.Component {
  // static propTypes = {
  //   emojiData: PropTypes.array
  // };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    console.log("or test: ", this.props)
    return (
      <div className="component-overview-results">
        {this.props.searchedData.map(data => (
          <OverviewResultsRow
            key={data.id}
            name={`${data.first_name} ${data.last_name}`}
            email={data.email_address}
            phone={data.phone_number}
            class={data.class}
          />
        ))}
      </div>
    );
  }
}
