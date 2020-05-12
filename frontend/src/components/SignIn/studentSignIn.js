import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import cookie from 'react-cookies';
import { studentLogin } from "../../mutation/studentProfile";
const jwt_decode = require('jwt-decode');


class StudentSignIn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            success: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email_id: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        let response = await this.props.studentLogin({
            variables: {
                email_id: data.email_id,
                password: data.password
            }
        });

        let res = response.data.student_login;
        if (res.success) {
            var decoded = jwt_decode(res.message.split(' ')[1]);
            console.log("decoded", decoded)
            localStorage.setItem("SID", decoded.SID);
            localStorage.setItem("Sname", decoded.name);
            this.setState({
                success: true
            })
        }
    }
    render() {
        let redirectVar = null, alertElement = null;
        if (localStorage.getItem("SID")) {
            redirectVar = <Redirect to="/profile" />
        }
        return (
            <div className='container'>
                {redirectVar}
                <form style={{ margin: '50px' }} id="loginForm" className='form-group' onSubmit={this.handleSubmit}>
                    <h1>Student Sign In:</h1>
                    <input
                        className='form-control'
                        placeholder="Email"
                        id="email"
                        type="email"
                        name="email"
                        title='Please follow the "characters@characters.domain" (at least 2 characters after the dot) standard for a valid email-id.'
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                        autoFocus /><br />
                    <input
                        className='form-control'
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        required /><br />
                    <button className='btn btn-primary btn-xs' type="submit">Sign In</button><br /><br />
                    {alertElement}
                </form>
            </div >
        );
    }
}

export default graphql(studentLogin, { name: "studentLogin" })(StudentSignIn);
