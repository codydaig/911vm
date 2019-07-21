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
    return (
      <div className="component-overview-results">
        {this.props.searchedData.map(data => (
          <OverviewResultsRow
            key={data.title}
            title={data.title}
            email={data.email}
            phone={data.phone}
          />
        ))}
      </div>
    );
  }
}
