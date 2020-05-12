import React, { Component } from 'react';
import { getAppliedJobs } from "../../queries/queries";
import { graphql } from 'react-apollo';

class JobApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: [],
            pageNO: 1,
            pendingFlag: false,
            reviewedFlag: false,
            declinedFlag: false
        }
    }
    render() {
        let appliedJobsElement = null;
        let res = {};
        if (this.props.data.getAppliedJobs) {
            res = this.props.data.getAppliedJobs
            console.log("res", res);
        }
        if (res.length > 0) {
            appliedJobsElement = res.map(job => {
                let status = "";
                // let appliedStudent = job.appliedStudents.filter(student => student._id === cookie.load("SID"));
                // console.log("applied student", appliedStudent)
                return (
                    <tr>
                        <td className='card shadow' style={{ textAlign: 'center' }}>
                            <h4>{job.title}</h4>
                            <p>{job.location}</p>
                            <p>{job.companyName}</p>
                            {/* <p>Applied On: {new Date(appliedStudent[0].applicationDate).getMonth() + 1}-{new Date(appliedStudent[0].applicationDate).getDate()}-{new Date(appliedStudent[0].applicationDate).getFullYear()}</p> */}
                            {/* <p>Status: {appliedStudent[0].status}</p> */}
                        </td>
                    </tr>
                )
            })
        }


        return (
            <div className="container">

                <table style={{ marginTop: '15px' }} className="table">
                    <tbody>
                        {appliedJobsElement}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default graphql(getAppliedJobs, { options: { variables: { user_id: localStorage.getItem("SID") } } })(JobApplications);