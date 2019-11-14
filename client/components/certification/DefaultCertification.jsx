import React from "react";

<<<<<<< HEAD
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
=======
const DefaultCertification = props => {
  return (
    <div className="certifications">
      <div className="cell">
        <p>{props.data.name}</p>
      </div>
      <div className="cell">
        <p>{props.data.expriation_date}</p>
      </div>
      <div className="cell">
        <p>{props.data.signature_person_name}</p>
      </div>
      <div className="cell">
        <p>{props.data.signature_date}</p>
      </div>
      <div className="cell">
        <button
          name="edit-btn"
          className="edit-certification"
          onClick={props.handleClick}
        >
          Edit
        </button>
        <button name="delete-btn">Delete</button>
      </div>
    </div>
  );
};
>>>>>>> 669ec474e1723f0b1d624f4d8c1fa66b509b9094

export default DefaultCertification;
