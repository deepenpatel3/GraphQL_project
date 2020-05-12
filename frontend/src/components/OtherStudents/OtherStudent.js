import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { Link, Redirect } from "react-router-dom";

class OtherStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.location.state.student,
            path: this.props.location.state.path
        }
    }
    render() {
        let redirectVar = null;
        console.log("student", this.state.student)
        let educationElement =
            <div>
                <li className="list-group-item">{this.state.student.educationDetails.school}</li>
                <li className="list-group-item">{this.state.student.educationDetails.location}</li>
                <li className="list-group-item">{this.state.student.educationDetails.degree}</li>
                <li className="list-group-item">{this.state.student.educationDetails.major}</li>
                <li className="list-group-item">{this.state.student.educationDetails.gpa}</li>
            </div>

        let experienceElement =
            <div>
                <li className="list-group-item">{this.state.student.experienceDetails.title}</li>
                <li className="list-group-item"> At {this.state.student.experienceDetails.companyName}, Located at {this.state.student.experienceDetails.location}</li>
                <li className="list-group-item"> From {this.state.student.experienceDetails.startDate} to {this.state.student.experienceDetails.endDate}</li>
                <li className="list-group-item">Description: {this.state.student.experienceDetails.description}</li>
            </div>

        return (
            <div className='container'>
                < CompanyNavbar />
                <Link to={this.state.path}>Back</Link>
                <div style={{ marginTop: '20px' }} >
                    <div className='col-md-4'>
                        <div style={{ textAlign: 'center' }}>
                            <div className='row'>
                                <div className='col-4'>
                                    <img style={{ height: '110px', weight: '110px' }} src={"https://picsum.photos/200"}></img>

                                </div>
                                <div className='col'>
                                    <ul className="list-group">
                                        <li className="list-group-item">{this.state.student.name}</li>
                                        <li className="list-group-item">{this.state.student.school}</li>
                                        <li className="list-group-item">{this.state.student._id}</li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <ul className="list-group">
                                <li className="list-group-item">Contact Information:</li>
                                <li className="list-group-item">{this.state.student.email}</li>
                            </ul>
                        </div>

                    </div>
                    <div className='col-md-8'>
                        <ul className="list-group" style={{ textAlign: 'center' }}>
                            <li className="list-group-item"> Career Objective:</li>
                            <li className="list-group-item">{this.state.student.careerObjective}</li>
                        </ul>
                        <ul className="list-group" style={{ marginTop: '20px', textAlign: 'center' }}>
                            <li className="list-group-item"> Education Details:</li>
                            <li className="list-group-item">{educationElement}</li>
                        </ul>
                        <ul className="list-group" style={{ marginTop: '20px', textAlign: 'center' }}>
                            <li className="list-group-item"> Experience Details:</li>
                            <li className="list-group-item">{experienceElement}</li>
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}

export default OtherStudent;