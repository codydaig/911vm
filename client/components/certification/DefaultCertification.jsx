import React from "react";

class DefaultCertification extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <div className="cell">
          <p>{data.name}</p>
        </div>
        <div className="cell">
          <p>{data.expriation_date}</p>
        </div>
        <div className="cell">
          <p>{data.signature_person_name}</p>
        </div>
        <div className="cell">
          <p>{data.signature_date}</p>
        </div>
        <div className="cell">
          <button
            name="edit-btn"
            className="edit-certification"
            onClick={this.props.handleClick}
          >
            Edit
          </button>
          <button name="delete-btn">Delete</button>
        </div>
      </React.Fragment>
    );
  }
}

export default DefaultCertification;
