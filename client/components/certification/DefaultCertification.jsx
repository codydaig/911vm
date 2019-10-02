import React from "react";

class DefaultCertification extends React.Component {
    constructor() {
        super()
        
        this.state = {

        }
    }

    render() {
      const { data } = this.props;
        return (
          <div className="certifications">
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
              {/* <button className="edit-certification" onClick={this.props.onClick} >
                Edit
              </button>
              <button>
                Delete
              </button> */}
            </div>
          </div>
        );
    }
};

export default DefaultCertification;
