import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { graphql } from 'react-apollo';
import { getOtherStudents } from "../../queries/queries";
import { Link, Redirect } from "react-router-dom";

class OtherStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            nameOrSchool: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = (e) => {
        e.preventDefault();
        let studentList = document.getElementById("myList");
        // console.log("list", studentList);

        const term = e.target.value.toLowerCase();
        console.log("-----------term-------------", term)
        const students = studentList.getElementsByTagName('li');
        Array.from(students).forEach(function (student) {

            const name = student.querySelector('a#name').innerHTML.toLowerCase();
            const school = student.querySelector('p#school').innerHTML.toLowerCase();
            console.log("name", name, " school ", school);
            if (name.indexOf(term) > -1 || school.indexOf(term) > -1) {
                student.style.display = 'block';
            } else {

                student.style.display = 'none';
            }
            // console.log("student", student)
        })
    }
    render() {
        var studentsElement = null, redirectVar = null;
        if (!localStorage.getItem("SID")) redirectVar = <Redirect to="/studentSignIn" />
        let res = {};
        if (this.props.data.getOtherStudents) {
            res = this.props.data.getOtherStudents;
            console.log("res", res);
        }
        if (res.length > 0) {
            studentsElement = res.map(student => {
                console.log("student,", student)
                return (
                    <li className="card shadow" style={{ textAlign: "center" }}>
                        <div >
                            <p className="list-group-item"><Link id='name' to={{
                                pathname: "/otherStudent",
                                state: {
                                    student: student,
                                    path: '/students'
                                }
                            }} style={{ color: 'black' }}>{student.name}</Link></p>
                            <p className="list-group-item">{student.email}</p>
                            <p id='school' className="list-group-item">{student.school}</p>
                            <p className="list-group-item">{student.city}</p>

                        </div>
                    </li>
                )
            })
        } else {
            studentsElement = <h3>No Students found</h3>
        }

        return (
            <div className='container'>
                {redirectVar}
                <Navbar />
                <input type="text" style={{ width: "100%" }} onChange={this.handleSearch} placeholder="Explore Students by Name or College"></input>
                <ul id='myList' className='list-group'>
                    {studentsElement}
                </ul>

            </div>
        );
    }
}
export default graphql(getOtherStudents, { options: { variables: { user_id: localStorage.getItem("SID") } } })(OtherStudents);

