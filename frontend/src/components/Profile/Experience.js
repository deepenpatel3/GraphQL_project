import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { studentGetExperience } from "../../queries/queries";
import { updateStudentExperience } from "../../mutation/studentProfile";

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleToggle = () => {
        // console.log('addflag after add button: before toggling', this.state.addFlag)
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })

        } else {
            this.setState({
                addFlag: true
            })
        }
        // console.log('addflag after add button: after toggling', this.state.addFlag)
    }

    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: localStorage.getItem("SID"),
            companyName: document.getElementById("companyName").value,
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            description: document.getElementById("description").value
        }
        let res = await this.props.updateStudentExperience({
            variables: {
                user_id: data.SID,
                companyName: data.companyName,
                location: data.location,
                title: data.title,
                startDate: data.startDate,
                endDate: data.endDate,
                description: data.description
            }
        });
        if (res.data.updateStudentExperience.success) {
            this.setState({ addFlag: false })
        }
    }
    render() {
        let educationElement = null;
        let res = {};
        if (this.props.data.student) {
            res = this.props.data.student.experienceDetails
            console.log(res);
        }
        if (this.state.addFlag === true) {
            educationElement =
                <div>
                    <form className="container">
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Name of Company"
                            required
                            autoFocus />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title of Experience"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="date"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="date"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="description"
                            name="description"
                            placeholder="description"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleToggle}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>

                    </form>
                </div>
        } else {
            educationElement =
                <div>
                    <p>Title: {res.title}</p>
                    <p>Company: {res.companyName}</p>
                    <p>location: {res.location}</p>
                    <p>Starting from: {res.startDate}</p>
                    <p>to: {res.endDate}</p>
                    <p>Description: {res.description}</p>
                </div>
        }
        return (
            <div className="container">
                <label>Experience</label>
                <button style={{ marginLeft: '575px', borderRadius: "30%" }} className="btn btn-secondary" onClick={this.handleToggle}>edit</button>
                {educationElement}
            </div>
        );
    }
}
export default compose(graphql(studentGetExperience, {
    options: {
        variables: { user_id: localStorage.getItem("SID") }
    }
}), graphql(updateStudentExperience, {
    name: "updateStudentExperience",
    options: { refetchQueries: [{ query: studentGetExperience, variables: { user_id: localStorage.getItem("SID") } }] }

}))(Experience);