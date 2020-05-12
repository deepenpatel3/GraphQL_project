import Modal from 'react-modal';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { studentGetBasicDetails } from "../../queries/queries";
import { updateStudentBasicDetails } from "../../mutation/studentProfile";

class BasicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: "",
            editFlag: false,
            modalIsOpen: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.setModalIsOpen = this.setModalIsOpen.bind(this);
    }
    setModalIsOpen = (value) => {
        this.setState({
            modalIsOpen: value
        })
    }
    handleEdit = () => {
        this.setState({
            editFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            editFlag: false
        })
    }
    handleSave = async (e) => {
        e.preventDefault();
        let res = await this.props.updateStudentBasicDetails({
            variables: {
                user_id: localStorage.getItem("SID"),
                name: document.getElementById("name").value,
                city: document.getElementById("city").value,
                school: document.getElementById("school").value
            }
        });

        if (res.data.updateStudentBasicDetails.success) {
            this.setState({ editFlag: false })
        }

    }
    render() {
        let infoOrForm = null;
        let res = {};

        if (this.props.data.student) {
            res = this.props.data.student
        }
        if (this.state.editFlag === false) {
            infoOrForm =
                <div className='row'>
                    <div className='col'>
                        <p >{res.name}</p>
                        <p >{res.school}</p>
                        <p >{res.city}</p>
                    </div>
                    <div className='col-1'>
                        <button onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button>
                    </div>
                </div>
        }
        else {
            infoOrForm =
                <form className="form-group">
                    <input
                        style={{ margin: "5px" }}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange}
                        required
                        autoFocus />

                    <input
                        style={{ margin: "5px" }}
                        className="form-control"
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={this.handleChange}
                        required />

                    <input
                        style={{ margin: "5px" }}
                        className="form-control"
                        type="text"
                        id="school"
                        name="school"
                        placeholder="School"
                        onChange={this.handleChange}
                        required />

                    <button className="btn btn-danger btn-xs" onClick={this.handleCancel}>Cancel</button>
                    <button style={{ marginLeft: '20px' }} className="btn btn-success btn-xs" onClick={this.handleSave}>Save</button>
                </form>

        }
        return (
            <div className="container">
                <div className='col-md-6'>
                    <div>
                        <img src={"https://picsum.photos/200"} className="responsive" style={{ width: "100%", height: "auto" }}></img>
                    </div>
                </div>
                <div className='col-md-6'>
                    {infoOrForm}
                </div>
                {/* <button className="btn btn-lg" onClick={() => this.setModalIsOpen(true)}><i class="fa fa-edit" /></button>
                <Modal isOpen={this.state.modalIsOpen}>
                    <form className='md-form' action={"http://localhost:3001/updateProfilePic"} method="POST" encType='multipart/form-data' >
                        <input style={{ display: "none" }} name='SID' value={localStorage.getItem("SID")}></input>
                        <input className="file-field" type='file' name='profilePic' id='profilePic'></input>
                        <button className='btn btn-primary' type='submit'>Save</button>
                    </form>
                    <button onClick={() => this.setModalIsOpen(false)}>close</button>
                </Modal> */}

            </div >
        );
    }
}
export default compose(graphql(studentGetBasicDetails, {
    options: {
        variables: { user_id: localStorage.getItem("SID") }
    }
}), graphql(updateStudentBasicDetails, {
    name: "updateStudentBasicDetails",
    options: { refetchQueries: [{ query: studentGetBasicDetails, variables: { user_id: localStorage.getItem("SID") } }] }

}))(BasicDetails);