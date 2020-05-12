import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar";
import { Redirect, Link } from 'react-router-dom';

class OtherCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CID: this.props.location.state.companyID,
            backPath: this.props.location.state.backPath
        }
    }
    render() {
        console.log("company", this.state.CID);
        let contactOrForm = null, companyOrForm = null, redirectVar = null;
        if (!localStorage.getItem("SID")) {
            redirectVar = <Redirect to="/studentSignIn" />;
        }

        contactOrForm =
            <div>
                <h5>Email: {this.state.CID.email}</h5>
                <h5>Phone: {this.state.CID.phone}</h5>
            </div>


        companyOrForm =
            <div>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.state.CID.companyName}</h1>
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}><h5>{this.state.CID.location}</h5></div>
                <div style={{ marginTop: '20px' }}>
                    <h4>Description:</h4>
                    <h4>{this.state.CID.description}</h4>
                </div>
            </div>

        return (
            <div className='container'>
                {redirectVar}
                <Navbar />
                <Link to={{ pathname: this.state.backPath }} style={{ marginTop: "0px" }}>Back</Link>
                <div>
                    <div style={{ textAlign: 'center' }} className='col-md-5'>

                        <div className=' shadow p-3 mb-5 bg-white rounded'>
                            <img src={"https://source.unsplash.com/random"} style={{ height: '200px', weight: '200px' }}></img>
                        </div>


                        <div style={{ textAlign: 'left' }} className='shadow p-3 mb-5 bg-white rounded'>
                            {contactOrForm}
                        </div>

                    </div>
                    <div className='col-md-7 shadow p-3 mb-5 bg-white rounded'>
                        {companyOrForm}
                    </div>
                </div>

            </div>
        );
    }
}
export default OtherCompany;