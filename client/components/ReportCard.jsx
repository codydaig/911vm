import React from "react";
import moment from "moment";
import axios from "axios";

// @Karin Hsu i have few endpoints you can play with.  GET /api/person,  GET /api/person/:id,  GET /api/person/:id/certification
<<<<<<< HEAD
//placeholder id
const id = "54ddf0c0-b342-4caa-b9dd-04870c55ffc9";
=======
>>>>>>> 7525d1dcf52cb954ccb655cad7ac499ee1490fe7

const EditingPersonalInfoCard = ({ personInfo, onChange }) => {
  return (
    <div>
      <div className="personal-info">
        <div className="personal-info-header">
          <h1>
            {personInfo.first_name} {personInfo.last_name}
          </h1>
        </div>
        <form>
          <div className="cell">
            <h3>Email</h3>
          </div>
          <div className="cell">
            <h3>Phone Number</h3>
          </div>
          <div className="cell">
            <h3>Administrator</h3>
          </div>
          <div className="cell">
            <h3>Volunteer</h3>
          </div>
          <div className="cell">
          <button>Edit</button>
          </div>
          <div className="cell">
          <button>Cancel</button>
          </div>

          <div className="cell">
            <p>
              <input
                type="text"
                placeholder={personInfo.email_address}
                id="email_address"
                onChange={onChange}
              />
            </p>
          </div>
          <div className="cell">
            <input
              type="text"
              minLength="10"
              maxLength="10"
              placeholder={personInfo.phone_number}
              id="phone_number"
              onChange={onChange}
            />
          </div>
          <div className="cell">
            <select
              defaultValue={personInfo.is_admin ? "true" : "false"}
              id="is_admin"
              onChange={onChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="cell">
            <select
              defaultValue={personInfo.is_volunteer ? "true" : "false"}
              id="is_volunteer"
              onChange={onChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

const DefaultPersonalInfoCard = ({
  personInfo,
  email_address,
  phone_number,
  is_admin,
  is_volunteer
}) => {
  return (
    <div className="personal-info">
      <div className="personal-info-header">
        <h1>
          {personInfo.first_name} {personInfo.last_name}
        </h1>
      </div>
      <div className="cell">
        <h3>Email</h3>
      </div>
      <div className="cell">
        <h3>Phone Number</h3>
      </div>
      <div className="cell">
        <h3>Administrator</h3>
      </div>
      <div className="cell">
        <h3>Volunteer</h3>
      </div>
      <div className="cell">
        <p>{personInfo.email_address}</p>
      </div>
      <div className="cell">
        <p>{personInfo.phone_number}</p>
      </div>
      <div className="cell">
        <p>{personInfo.is_admin ? "Yes" : "No"}</p>
      </div>
      <div className="cell">
        <p>{personInfo.is_volunteer ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email_address: "",
      phone_number: "",
      is_admin: "",
      is_volunteer: "",
      certifications: [],
<<<<<<< HEAD
      volunteerNames: [],
      volunteerInfo: {},
      currentVolunteer: {}
    };
=======
      loaded: false,
      id: props.match.params.id // get the ID from the
    }
>>>>>>> 7525d1dcf52cb954ccb655cad7ac499ee1490fe7
    this.handleClick = this.handleClick.bind(this);
    this.unixConverter = this.unixConverter.bind(this);
    this.handlePersonalInfoChange = this.handlePersonalInfoChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.createCertification = this.createCertification.bind(this);
  }

<<<<<<< HEAD
=======
  componentDidMount() {
    axios.get(`/api/person/${this.state.id}`)
      .then((response) => {
        this.setState({
          personInfo: response.data.data,
          email_address: response.data.data.email_address,
          phone_number: response.data.data.phone_number,
          is_admin: response.data.data.is_admin,
          is_volunteer: response.data.data.is_volunteer
        })
        return axios.get(`/api/person/${this.state.id}/certification`)
      }) 
      .then((response) => {
        this.setState({
          editing: false, 
          certifications: response.data.data,
          loaded: true
        });
      })
      .catch((error) => {
        console.log("error", error)
      });
  }

>>>>>>> 7525d1dcf52cb954ccb655cad7ac499ee1490fe7
  unixConverter(unix) {
    const time = moment(unix).format("MM/DD/YYYY");
    return time;
  }

  handleSaveClick(e, saveAlteredCertifications) {
    e.preventDefault();
    // save to DB
    const { email_address, phone_number, is_admin, is_volunteer } = this.state;
    const isEditing = !this.state.editing;
    const updatedInfo = {
      email_address,
      phone_number,
      is_admin,
      is_volunteer
    };

    this.setState({ editing: isEditing });
    alert("saved to db" + JSON.stringify(updatedInfo));
    // axios.put(`/api/person/${id}`, updatedInfo)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log("error", error)
    //   })
  }

  handlePersonalInfoChange(event) {
    event.preventDefault();
    const id = event.target.id;
    let value; 
    if (id === "admin" || id === "volunteer") {
      value = (event.target.value == "true")
    } else {
      value = event.target.value
    }
    this.setState({[id]: value});
  }

  createCertification() {
    const createdCert = {
      certification: {
        name: "tbd",
        id: "tbd",
        expriation_date: "tbd",
        sign_off: { signature_date: null, id: null }
      }
    };
    this.setState({
      certifications: [...this.state.certifications, createdCert]
    });
  }

  render() {
<<<<<<< HEAD
    const { personInfo } = this.props;

    const {
      editing,
      email_address,
      phone_number,
      is_admin,
      is_volunteer,
      certifications
    } = this.state;

=======
    // const { personInfo } = this.props;
    const { editing, email_address, phone_number, is_admin, is_volunteer, certifications, personInfo } = this.state;

    if(!this.state.loaded) {
      return ( <div>Loading.....</div>)
    }
      
>>>>>>> 7525d1dcf52cb954ccb655cad7ac499ee1490fe7
    return (
      <div>
        {editing ? (
          <EditingPersonalInfoCard
            personInfo={personInfo}
            onChange={this.handlePersonalInfoChange}
          />
        ) : (
          <DefaultPersonalInfoCard
            personInfo={personInfo}
            email_address={email_address}
            phone_number={phone_number}
            is_admin={is_admin}
            is_volunteer={is_volunteer}
          />
        )}
      </div>
    );
  }
}
