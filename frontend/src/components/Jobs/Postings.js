import React, { Component } from 'react';
// import { studentGetJobs } from '../../js/actions/jobsAction';
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAllJobs } from "../../queries/queries";
import { applyJob } from "../../mutation/studentProfile";

class Postings extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstJob: {},
            firstJobFlag: false,
            applyFlag: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.showJob = this.showJob.bind(this);
        this.handleApply = this.handleApply.bind(this);
    }
    showJob = (job) => {
        this.setState({
            firstJob: job,
            firstJobFlag: true
        })
    }
    handleSearch = (e) => {
        let jobList = document.getElementById("myList");
        console.log("list", jobList);

        const term = e.target.value.toLowerCase();
        // console.log("-----------term-------------", term)
        const jobs = jobList.getElementsByTagName('li');
        Array.from(jobs).forEach(function (job) {
            // console.log("job", job)
            const title = job.querySelector('p#title').innerHTML.toLowerCase();
            const company = job.querySelector('p#companyName').innerHTML.toLowerCase();

            if (title.indexOf(term) > -1 || company.indexOf(term) > -1) {
                job.style.display = 'block';
            } else {

                job.style.display = 'none';
            }
            // console.log("student", job)
        })
    }
    handleApply = async (e) => {
        e.preventDefault();
        // console.log("frist", this.state.firstJob)
        let res = await this.props.applyJob({
            variables: {
                user_id: localStorage.getItem("SID"),
                job_id: this.state.firstJob._id
            }
        });
        console.log("res", res)
        if (res.data.applyJob.success) {
            this.setState({ applyFlag: false, firstJobFlag: false })
        }
    }
    render() {
        // console.log("applied flag----- ", this.state.appliedFlag)
        var jobelement = null, alertElement = null, firstElement = null;
        let res = {};
        if (this.props.data.getAllJobs) {
            res = this.props.data.getAllJobs;

            console.log("res", res);
        }
        if (res.length > 0) {
            jobelement = res.map(job => {
                return (
                    <li className="card shadow">

                        <button onClick={() => this.showJob(job)} className="btn">
                            <ul style={{ textAlign: 'left' }}>
                                <p style={{ fontSize: "15px" }} id='title'>{job.title}</p>
                                <p style={{ fontSize: "15px" }} id='companyName'>{job.companyID.companyName}</p>
                                <p style={{ fontSize: "15px" }}>At {job.location}</p>
                                <p style={{ fontSize: "15px" }}>{job.category}</p>
                                <p style={{ fontSize: "15px" }}>Posted On: {new Date(job.postingDate).getMonth() + 1}-{new Date(job.postingDate).getDate()}-{new Date(job.postingDate).getFullYear()}</p>
                                <p style={{ fontSize: "15px" }}>Application Deadline: {new Date(job.deadline).getMonth() + 1}-{new Date(job.deadline).getDate()}-{new Date(job.deadline).getFullYear()}</p>
                            </ul>
                        </button>

                    </li>
                )
            })
            if (this.state.firstJobFlag) {
                firstElement =
                    <div style={{ margin: "15px" }}>
                        <div className="row">
                            <div className="col">
                                <h1>{this.state.firstJob.title}</h1>
                            </div>
                            <button className='btn btn-primary' style={{ font: "25px" }} onClick={this.handleApply}>Apply</button>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p><Link to={{
                                    pathname: "/otherCompany",
                                    state: {
                                        companyID: this.state.firstJob.companyID,
                                        backPath: '/jobs'
                                    }
                                }}> {this.state.firstJob.companyName}</Link></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>{this.state.firstJob.category}</p>
                            </div>
                            <div className="col">
                                <p>{this.state.firstJob.location}</p>
                            </div>
                            <div className="col">
                                <p>Salary: {this.state.firstJob.salary}</p>
                            </div>
                            <div className="col">
                                <p>{this.state.firstJob.postingDate}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Applications close on {this.state.firstJob.deadline}</p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Job Description:  {this.state.firstJob.description}</p>
                            </div>
                        </div>
                    </div>
            } else {
                firstElement = <p></p>
            }

        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }} class="form-inline">
                            <input style={{ width: '100%' }} name="titleOrCompany" onChange={this.handleSearch} class="form-control" placeholder="Search jobs by Title or Company Name..." />
                        </div>
                    </div>
                </div>

                <div >
                    <div className="row">
                        <ul id='myList' className="col-4">
                            {jobelement}
                            {/* {alertElement} */}
                        </ul>
                        <div className="col card shadow">
                            {firstElement}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default compose(graphql(getAllJobs, {
    options: {
        variables: { user_id: localStorage.getItem("SID") }
    }
}), graphql(applyJob, {
    name: "applyJob",
    options: { refetchQueries: [{ query: getAllJobs, variables: { user_id: localStorage.getItem("SID") } }] }
})
)(Postings);

