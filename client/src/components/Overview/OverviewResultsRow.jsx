import React from "react";
import PropTypes from "prop-types";
// import "../../../Styles/EmojiResultsRow.css";

export default class OverviewResultsRow extends React.Component {
  // static propTypes = {
  //   title: PropTypes.string,
  //   symbol: PropTypes.string
  // };

  render() {
    return (
      <div
        className="component-overview-result-row copy-to-clipboard"
      >
        <span className="title">
          <div>
            Name: {this.props.title}
          </div>
          <div>
            Email: {this.props.email} 
          </div>  
          <div>
            Phone: {this.props.phone}
          </div>
        </span>
      </div>
    );
  }
}
