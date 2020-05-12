const Student = require("../Models/studentModel");
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const Job = require("../Models/jobModel");

async function studentLogin(data) {
    // console.log('student email- ', msg.body.email);
    // console.log('student password- ', msg.body.password);
    console.log("data", data);
    let password = data.password;
    // let result = {};
    let student = await Student.findOne({ email: data.email_id });

    if (student.length === 0) {
        console.log('wrong email')
        return { success: false, message: "wrong email" };
    }
    else {
        console.log("student found-", student)
        if (bcrypt.compareSync(password, student.password)) {
            console.log('student match')
            const payload = { name: student.name, SID: student._id };
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            token = 'JWT ' + token;
            return { success: true, message: token };

        }
        else {
            console.log('wrong password')
            return { success: false, message: 'wrong password' };
        }

    }
}

async function updateCareerObjective(data) {
    console.log("data2", data);

    // let result = {};
    let student = await Student.findOne({ _id: data.user_id });
    if (student) {
        console.log("student found-", student)
        student.careerObjective = data.careerObjective;

        let update = await student.save();
        if (update) {
            return { success: true, message: "Updated career objective" };
        }
        else {
            return { success: false, message: "can not be Updated " };
        }
    }
}

async function updateBasicDetails(data) {
    console.log("data1", data);
    let student = await Student.findOne({ _id: data.user_id });
    if (student) {
        console.log("student found-", student)
        student.name = data.name;
        student.school = data.school;
        student.city = data.city;
        let update = await student.save();
        if (update) return { success: true, message: "Updated basic details" };
        else return { success: false, message: "can not be Updated " };
    }
}

async function updateEducation(data) {
    console.log("data3", data);
    let student = await Student.findOne({ _id: data.user_id });
    if (student) {
        console.log("student found-", student)
        student.educationDetails.location = data.location;
        student.educationDetails.school = data.school;
        student.educationDetails.degree = data.degree;
        student.educationDetails.passingYear = data.passingYear;
        let update = await student.save();
        if (update) return { success: true, message: "Updated education details" };
        else return { success: false, message: "can not be Updated " };
    }
}
async function updateExperience(data) {
    console.log("data4", data);
    let student = await Student.findOne({ _id: data.user_id });
    if (student) {
        // console.log("student found-", student)
        student.experienceDetails.location = data.location;
        student.experienceDetails.title = data.title;
        student.experienceDetails.companyName = data.companyName;
        student.experienceDetails.startDate = data.startDate;
        student.experienceDetails.endDate = data.endDate;
        student.experienceDetails.description = data.description;
        let update = await student.save();
        if (update) return { success: true, message: "Updated experience details" };
        else return { success: false, message: "can not be Updated " };
    }
}

async function applyJob(data) {
    console.log("data4", data);
    let job = await Job.findOne({ _id: data.job_id });
    if (job) {
        console.log("job found-", job)
        await job.appliedStudents.push({ _id: data.user_id });
        let update = await job.save();
        console.log("update", update)
        if (update) return { success: true, message: "applied to a job" };
        else return { success: false, message: "can not apply " };
    }
}
exports.updateBasicDetails = updateBasicDetails;
exports.updateCareerObjective = updateCareerObjective;
exports.updateEducation = updateEducation;
exports.updateExperience = updateExperience;
exports.studentLogin = studentLogin;
exports.applyJob = applyJob;