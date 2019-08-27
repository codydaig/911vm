import React from "react";
import AddVolunteerForm from "./AddVolunteerForm.jsx";

class OpenFormButton extends React.Component {
  state = {
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="addVolunteer">
        <button type="button" onClick={this.showModal}>
          Add Volunteer
        </button>
        <AddVolunteerForm show={this.state.show} handleClose={this.hideModal} />
      </div>
    );
  }
}

export default OpenFormButton;
