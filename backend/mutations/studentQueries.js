const Student = require("../Models/studentModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

async function student_login(data) {
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
exports.student_login = student_login;