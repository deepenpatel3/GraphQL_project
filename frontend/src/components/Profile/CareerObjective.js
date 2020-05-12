import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { studentGetCareerObjective } from "../../queries/queries";
import { updateStudentCareerObjective } from "../../mutation/studentProfile";

class CareerObjective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careerObjective: '',
            editFlag: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
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

        let data = {
            user_id: localStorage.getItem("SID"),
            careerObjective: document.getElementById("careerObjective").value
        }
        let res = await this.props.updateStudentCareerObjective({
            variables: {
                user_id: data.user_id,
                careerObjective: data.careerObjective
            }
        });
        if (res.data.updateStudentCareerObjective.success) {
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
            infoOrForm = <p style={{ border: "0" }} className="list-group-item">{res.careerObjective}</p>
        }
        else {
            infoOrForm =
                <form className="container">
                    <textarea
                        style={{ width: '400px' }}
                        // type="textarea"
                        id="careerObjective"
                        name="careerObjective"
                        required
                        autoFocus />
                    <br />
                    <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleCancel}>Cancel</button>
                    <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>
                </form>
        }
        return (

            <div className="container, card-body">
                <label >Career Objective</label>
                <button style={{ marginLeft: "545px" }} onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button>

                {infoOrForm}

            </div>
        );
    }
}
export default compose(graphql(studentGetCareerObjective, {
    options: {
        variables: { user_id: localStorage.getItem("SID") }
    }
}), graphql(updateStudentCareerObjective, {
    name: "updateStudentCareerObjective",
    options: { refetchQueries: [{ query: studentGetCareerObjective, variables: { user_id: localStorage.getItem("SID") } }] }

}))(CareerObjective);


