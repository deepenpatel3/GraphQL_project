import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import BasicDetails from './BasicDetails';
import CareerObjective from './CareerObjective';
import EducationDetails from './EducationDetails';
import Experience from './Experience';

import { Redirect } from 'react-router';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("SID")) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div className="container">
                {redirectVar}
                <Navbar />
                <div className='col-md-4'>
                    <div className="card bg-light text-dark, shadow p-3 mb-5 bg-white rounded" > <BasicDetails /> </div>

                    {/* <div className="card bg-light text-dark, shadow p-3 mb-5 bg-white rounded"> <Skills /> </div> */}
                </div>
                <div className='col-md-8'>
                    <div className="card bg-light text-dark, shadow p-3 mb-5 bg-white rounded"><CareerObjective /></div>
                    <div className="card bg-light text-dark, shadow p-3 mb-5 bg-white rounded"><EducationDetails /></div>
                    <div className="card bg-light text-dark, shadow p-3 mb-5 bg-white rounded"><Experience /></div>
                </div>
            </div>
        );
    }
}

export default Profile;