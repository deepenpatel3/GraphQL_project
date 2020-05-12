const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: String,
    email: String,
    school: String,
    password: String,
    skills: [String],
    city: String,
    profilePic: String,
    educationDetails: { school: String, location: String, degree: String, passingYear: String },
    careerObjective: String,
    experienceDetails: { companyName: String, title: String, location: String, startDate: String, endDate: String, description: String }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('students', studentSchema);
