import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { companyGetContact } from "../../queries/companyQueries";
import { updateCompanyContact, updateCompanyDetails } from "../../mutation/company";

// import { companyGetDetails, companyUpdateContactDetails, companyUpdateBasicDetails } from "../../js/actions/profileAction";

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: "",
            contactFlag: false,
            companyEditFlag: false
        }
        this.editContact = this.editContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.handleCompanyEdit = this.handleCompanyEdit.bind(this);
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this);
    }
    updateContact = async (e) => {
        e.preventDefault();
        let data = { email: document.getElementById('email').value, phone: document.getElementById('phone').value, CID: localStorage.getItem("CID") }
        let res = await this.props.updateCompanyContact({
            variables: {
                user_id: data.CID,
                email: data.email,
                phone: data.phone

            }
        });
        if (res.data.updateCompanyContact.success) {
            this.setState({ contactFlag: false })
        }
    }
    editContact = () => {
        this.setState({
            contactFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            contactFlag: false,
            companyEditFlag: false
        })
    }
    handleCompanyEdit = () => {
        this.setState({
            companyEditFlag: true
        })
    }
    updateCompanyDetails = async (e) => {
        e.preventDefault();
        let data = {
            companyName: document.getElementById('companyName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            CID: localStorage.getItem("CID")
        }
        let res = await this.props.updateCompanyDetails({
            variables: {
                user_id: data.CID,
                companyName: data.companyName,
                location: data.location,
                description: data.description
            }
        });
        if (res.data.updateCompanyDetails.success) {
            this.setState({ companyEditFlag: false })
        }
    }
    render() {
        let contactOrForm = null, companyOrForm = null, redirectVar = null;
        if (!localStorage.getItem("CID")) {
            redirectVar = <Redirect to="/companySignIn" />;
        }
        let res = {};
        if (this.props.data.company)
            res = this.props.data.company
        console.log("res", res)
        if (this.state.contactFlag) {
            contactOrForm =
                <div>
                    <form className="form-group" onSubmit={this.updateContact}>
                        <input className="form-control" type='text' id='email' name='email' placeholder='Enter your email' required autoFocus />
                        <input className="form-control" type='text' id='phone' name='phone' placeholder='Enter your phone' required />
                        <button type="submit" style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Save</button>
                        <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>

        } else {
            contactOrForm =
                <div>
                    <div className='row'>
                        <div className='col' >
                            <label>Contact US at:</label>
                        </div>
                        <div className='col' >
                            <button style={{ float: "right" }} className='btn btn-default btn-xs' onClick={this.editContact}>Edit</button>
                        </div>
                    </div>
                    <h5>Email: {res.email}</h5>
                    <h5>Phone: {res.phone}</h5>
                </div>
        }
        if (this.state.companyEditFlag) {
            companyOrForm =
                <div>
                    <form className="form-group" onSubmit={this.updateCompanyDetails}>
                        <input className="form-control" type='text' id='companyName' placeholder='Enter Company name' required autoFocus />
                        <input className="form-control" type='text' id='location' placeholder='Location' required />
                        <input className="form-control" type='text' id='description' placeholder='Descrption' required />
                        <button type="submit" style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Save</button>
                        <button className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
        } else {
            companyOrForm =
                <div style={{ margin: "10px" }}>
                    <div className='row'>
                        <div className='col'>
                            <h1>{res.companyName}</h1>
                        </div>
                        <div className='col'>
                            <button style={{ float: "right" }} className='btn btn-default btn-xs' onClick={this.handleCompanyEdit}>Edit</button>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px' }}><h5>{res.location}</h5></div>
                    <div style={{ marginTop: '20px' }}>
                        <h4>Description:</h4>
                        <h4>{res.description}</h4>
                    </div>
                </div>
        }
        return (
            <div className='container'>
                {redirectVar}
                <CompanyNavbar />
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
            </div >
        );
    }
}
export default compose(graphql(companyGetContact, {
    options: {
        variables: { user_id: localStorage.getItem("CID") }
    }
}), graphql(updateCompanyContact, {
    name: "updateCompanyContact",
    options: { refetchQueries: [{ query: companyGetContact, variables: { user_id: localStorage.getItem("CID") } }] }
}), graphql(updateCompanyDetails, {
    name: "updateCompanyDetails",
    options: { refetchQueries: [{ query: companyGetContact, variables: { user_id: localStorage.getItem("CID") } }] }
})
)(CompanyProfile);