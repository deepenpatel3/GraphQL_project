const Student = require("../Models/studentModel");
const Company = require("../Models/companyModel");
const Job = require("../Models/jobModel");
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

async function companyLogin(data) {
    // console.log('student email- ', msg.body.email);
    // console.log('student password- ', msg.body.password);
    console.log("data", data);
    let password = data.password;
    // let result = {};
    let company = await Company.findOne({ email: data.email_id });

    if (company.length === 0) {
        console.log('wrong email')
        return { success: false, message: "wrong email" };
    }
    else {
        console.log("company found-", company)
        if (bcrypt.compareSync(password, company.password)) {
            console.log('company match')
            const payload = { name: company.companyName, CID: company._id };
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

async function updateCompanyContact(data) {
    console.log("data1", data);
    let company = await Company.findOne({ _id: data.user_id });
    if (company) {
        console.log("company found-", company)
        company.email = data.email;
        company.phone = data.phone;

        let update = await company.save();
        if (update) return { success: true, message: "Updated contact" };
        else return { success: false, message: "can not be Updated " };
    }
}

async function updateCompanyDetails(data) {
    console.log("data3", data);
    let company = await Company.findOne({ _id: data.user_id });
    if (company) {
        console.log("company found-", company)
        company.location = data.location;
        company.description = data.description;
        company.companyName = data.companyName;

        let update = await company.save();
        if (update) return { success: true, message: "Updated company details" };
        else return { success: false, message: "can not be Updated " };
    }
}

async function addCompanyJob(data) {
    console.log("data4", data);
    let newJob = new Job({
        companyID: data.companyID,
        location: data.location,
        description: data.description,
        companyName: data.companyName,
        title: data.title,
        salary: data.salary,
        postingDate: data.postingDate,
        deadline: data.deadline,
        category: data.category
    })
    let update = await newJob.save();
    if (update) return { success: true, message: "added company job" };
    else return { success: false, message: "can not be added " };

}

exports.companyLogin = companyLogin;
exports.updateCompanyContact = updateCompanyContact;
exports.updateCompanyDetails = updateCompanyDetails;
exports.addCompanyJob = addCompanyJob;