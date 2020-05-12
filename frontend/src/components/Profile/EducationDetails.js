import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { studentGetEducation } from "../../queries/queries";
import { updateStudentEducation } from "../../mutation/studentProfile";
// import { studentGetEducationDetails, studentAddEducationDetails } from "../../js/actions/profileAction";

class EducationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        // this.props.studentGetEducationDetails();
    }
    handleToggle = () => {
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })
        } else {
            this.setState({
                addFlag: true
            })
        }
    }
    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: localStorage.getItem("SID"),
            school: document.getElementById("school").value,
            location: document.getElementById("location").value,
            degree: document.getElementById("degree").value,
            passingYear: document.getElementById("passingYear").value

        }
        let res = await this.props.updateStudentEducation({
            variables: {
                user_id: data.SID,
                school: data.school,
                location: data.location,
                degree: data.degree,
                passingYear: data.passingYear
            }
        });
        if (res.data.updateStudentEducation.success) {
            this.setState({ addFlag: false })
        }
    }
    render() {
        // console.log("inside education render", this.props.educationDetails)
        let educationElement = null;
        let res = {};
        if (this.props.data.student) {
            res = this.props.data.student.educationDetails
            console.log(res);
        }
        if (this.state.addFlag === true) {
            educationElement =
                <div>
                    <form className="container">
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="school"
                            name="school"
                            placeholder="School"
                            required
                            autoFocus />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location of School"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="degree"
                            name="degree"
                            placeholder="Degree"

                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="number"
                            id="passingYear"
                            name="passingYear"
                            placeholder="Year of Graduation"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleToggle}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>

                    </form>
                </div>
        } else {
            educationElement =
                <div>
                    <p>School: {res.school}</p>
                    <p>Degree: {res.degree}</p>
                    <p>Location: {res.location}</p>
                    <p>Gradtuation Year: {res.passingYear}</p>
                </div>
        }
        return (
            <div className="container" >
                <label>Education Details</label>
                <button style={{ marginLeft: "545px", borderRadius: "30%" }} className="btn btn-secondary" onClick={this.handleToggle}>edit</button>
                {educationElement}
            </div>
        );
    }
}
export default compose(graphql(studentGetEducation, {
    options: {
        variables: { user_id: localStorage.getItem("SID") }
    }
}), graphql(updateStudentEducation, {
    name: "updateStudentEducation",
    options: { refetchQueries: [{ query: studentGetEducation, variables: { user_id: localStorage.getItem("SID") } }] }

}))(EducationDetails);
