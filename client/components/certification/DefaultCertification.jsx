import React from "react";

class DefaultCertificationCard extends Component {
    constructor() {
        super()
        
        this.state = {

        }
    }

    render() {
        return (
          <div className="certifications">
            <div className="cell">
              <p>{data.name}</p>
            </div>
            <div className="cell">
              <p>{data.expriation_date}</p>
            </div>
            <div className="cell">
              <p>{data.sign_off.signature_date}</p>
            </div>
            <div className="cell">
              {/* <button className="edit-certification" onClick={this.handleClick}> */}
              <button className="edit-certification" >
                Edit
              </button>
            </div>
          </div>
        );
    }
};

export default DefaultCertificationCard;
