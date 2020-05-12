import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { Link, Redirect } from "react-router-dom";
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { companyJobs } from "../../queries/companyQueries";
import { addCompanyJob } from "../../mutation/company";

class CompanyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstJob: {},
            postFlag: false,
            firstJobFlag: false
        }
        this.showJob = this.showJob.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.postJob = this.postJob.bind(this);
    }
    showJob = (job) => {
        this.setState({
            firstJob: job,
            firstJobFlag: true
        })
    }
    handlePost = () => {
        this.setState({
            postFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            postFlag: false
        })
    }
    postJob = async (e) => {
        e.preventDefault();
        let data = {
            CID: localStorage.getItem("CID"),
            companyName: localStorage.getItem("Cname"),
            title: document.getElementById('title').value,
            postingDate: document.getElementById('postingDate').value,
            deadline: document.getElementById('deadline').value,
            location: document.getElementById('location').value,
            salary: document.getElementById('salary').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
        }
        let res = await this.props.addCompanyJob({
            variables: {
                companyID: data.CID,
                companyName: data.companyName,
                title: data.title,
                postingDate: data.postingDate,
                deadline: data.deadline,
                location: data.location,
                salary: data.salary,
                description: data.deadline,
                category: data.category
            }
        });
        if (res.data.addCompanyJob.success) {
            this.setState({ postFlag: false })
        }
    }
    render() {
        let jobElement = null, jobOrForm = null, studentsElement = null, redirectVar = null, errorElement = null;
        if (!localStorage.getItem("CID")) {
            redirectVar = <Redirect to="/companySignIn" />;
        }
        let res = {};
        if (this.props.data.companyJobs) {
            res = this.props.data;
            console.log("res", res);
        }
        if (res.companyJobs) {
            jobElement = res.companyJobs.map(job => {
                return (
                    <div className="card shadow" style={{}}>

                        <button onClick={() => this.showJob(job)} className="btn">
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: "15px" }}>{job.title}</p>
                                <p style={{ fontSize: "15px" }}>{job.location}</p>
                            </div>
                        </button>

                    </div>
                )
            })

            // }
            if (this.state.postFlag) {
                jobOrForm =
                    <div>
                        <form className="form-group" onSubmit={this.postJob}>
                            <input className="form-control" type='text' id='title' placeholder='Job title' required autoFocus></input>
                            <input className="form-control" type='date' id='postingDate' placeholder='Posting Date' required></input>
                            <input className="form-control" type='date' id='deadline' placeholder='Application Deadline' required></input>
                            <input className="form-control" type='text' id='location' placeholder='Location' required></input>
                            <input className="form-control" type='number' id='salary' placeholder='Salary' required></input>
                            <input className="form-control" type='text' id='description' placeholder='Job Description' required></input>
                            <label for="category">Category:</label>
                            <select className="form-control" id="category" required>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="On Campus">On Campus</option>
                                <option value="Internship">Internship</option>
                            </select>
                            <button style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Post</button>
                            <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                        </form>
                    </div>
            } else {
                if (this.state.firstJobFlag) {
                    jobOrForm =
                        <div className='card shadow' >
                            <div style={{ margin: "20px" }}>
                                <button className='btn btn-primary' style={{ float: 'right' }} onClick={this.handlePost}>Post a Job</button>
                                <div className="row">
                                    <h1 style={{ margin: "10px" }}>{this.state.firstJob.title}</h1>
                                </div>
                                <div className="row">

                                    <div className="col">
                                        <p style={{ margin: "10px" }}>{this.state.firstJob.location}</p>
                                    </div>
                                    <div className="col">
                                        <p style={{ margin: "10px" }}>Salary: {this.state.firstJob.salary}</p>
                                    </div>
                                    <div className="col">
                                        <p style={{ margin: "10px" }}>Posted on: {this.state.firstJob.postingDate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{ margin: "10px" }}>Applications close on {this.state.firstJob.deadline}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{ margin: "10px" }}>Job Description:  {this.state.firstJob.description}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" style={{ margin: "10px" }}>
                                        <h4 >Applied Students: </h4>

                                        <div className="card-body">
                                            {this.state.firstJob.appliedStudents.map(student => {
                                                // console.log("student ID---- ", student._id)
                                                return (
                                                    <ul >
                                                        <li><Link to={{
                                                            pathname: "/otherStudent",
                                                            state: {
                                                                student: student._id,
                                                                path: '/companyJobs'
                                                            }
                                                        }} style={{ color: 'black', float: 'left' }}>{student._id.name}</Link>
                                                        </li>
                                                    </ul >
                                                )
                                            })}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                }

            }
        } else {
            errorElement = <h3>Post the First Job</h3>
            jobOrForm =
                <div>
                    <form className="form-group">
                        Job title: <input className="form-control" type='text' id='title' required autoFocus></input>
                        Posting Date: <input className="form-control" type='date' id='postingDate' required></input>
                        Application Deadline: <input className="form-control" type='date' id='deadline' required></input>
                        Location: <input className="form-control" type='text' id='location' required></input>
                        Salary: <input className="form-control" type='number' id='salary' required></input>
                        Job Description: <input className="form-control" type='text' id='description' required></input>
                        Category:
                        <select className="form-control" id="category" required>
                            <option value="full_time">Full Time</option>
                            <option value="part_time">Part Time</option>
                            <option value="on_campus">On Campus</option>
                            <option value="internship">Internship</option>
                        </select>
                        <button style={{ marginTop: '10px' }} className='btn btn-success btn-xs' onClick={this.postJob}>Post</button>
                        <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
        }
        return (
            <div className='container'>
                {redirectVar}
                <CompanyNavbar />
                <h3>Job Postings</h3>
                <div style={{ marginTop: '20px' }} className='row'>
                    <div className='col-4'>
                        {jobElement}

                        {errorElement}
                    </div>
                    <div className='col-8'>
                        {jobOrForm}
                    </div>
                </div>
            </div>
        );
    }
}
export default compose(graphql(companyJobs, {
    options: {
        variables: { user_id: localStorage.getItem("CID") }
    }
}), graphql(addCompanyJob, {
    name: "addCompanyJob",
    options: { refetchQueries: [{ query: companyJobs, variables: { user_id: localStorage.getItem("CID") } }] }
})
)(CompanyJobs);
