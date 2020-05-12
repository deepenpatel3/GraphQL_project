import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { Link } from "react-router-dom";
import { getAllStudents } from "../../queries/companyQueries";
import { graphql } from 'react-apollo';

class CompanyStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            nameOrSchoolOrskill: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = (e) => {
        let studentList = document.getElementById("mylist");
        // console.log("list", studentList);

        const term = e.target.value.toLowerCase();
        // console.log("-----------term-------------", term)
        const students = studentList.getElementsByTagName('li');
        Array.from(students).forEach(function (student) {

            const name = student.getElementsByTagName('a')[0].innerHTML.toLowerCase();
            const school = student.getElementsByTagName('p')[0].innerHTML.toLowerCase();
            // console.log("name", name, " school ", school);
            if (name.indexOf(term) > -1 || school.indexOf(term) > -1) {
                student.style.display = 'block';
            } else {

                student.style.display = 'none';
            }
            // console.log("student", student)
        })

    }
    render() {
        var studentsElement = null;
        let res = {};
        if (this.props.data.getAllStudents) {
            res = this.props.data.getAllStudents;
            console.log("res", res);
        }
        if (res.length > 0) {
            studentsElement = res.map(student => {
                return (
                    <li className="card shadow" style={{ textAlign: "center" }}>
                        <div >
                            <Link to={{
                                pathname: "/otherStudent",
                                state: {
                                    student: student, path: '/companyStudents'
                                }
                            }} style={{ color: 'black' }}>{student.name}</Link>
                            <p>{student.school}</p>


                        </div>
                    </li>
                )
            })
        } else {
            studentsElement = <h3>No Students found</h3>
        }
        return (
            <div className='container'>
                < CompanyNavbar />
                <h5>Explore Students</h5>
                <div className='row'>
                    <div className='col'>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }} class="form-inline">
                            <input style={{ width: '100%' }} type="text" onChange={this.handleSearch} class="form-control" placeholder="Search students by name or school or skill" />
                        </div>
                    </div>
                </div>
                <div className='row'>

                    <ul id="mylist" className='list-group' style={{ width: "100%" }}>{studentsElement}</ul>

                </div>
            </div>
        );
    }
}

export default graphql(getAllStudents)(CompanyStudents);
