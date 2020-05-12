const graphql = require('graphql');
const Student = require("../Models/studentModel");
const Company = require("../Models/companyModel");
const Job = require("../Models/jobModel");
const { updateCareerObjective, studentLogin, updateBasicDetails, updateEducation, updateExperience, applyJob } = require("../mutations/studentMutations");
const { companyLogin, updateCompanyContact, updateCompanyDetails, addCompanyJob } = require("../mutations/companyMutations");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const studentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        careerObjective: { type: GraphQLString },
        city: { type: GraphQLString },
        school: { type: GraphQLString },
        profilePic: { type: GraphQLString },
        educationDetails: { type: educationType },
        experienceDetails: { type: experienceType }
    })
});

const companyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        _id: { type: GraphQLID },
        companyName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        phone: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const educationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        school: { type: GraphQLString },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        passingYear: { type: GraphQLString }
    })
})

const experienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        companyName: { type: GraphQLString },
        location: { type: GraphQLString },
        title: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        success: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const appliedStudentsType = new GraphQLObjectType({
    name: 'AppliedStudents',
    fields: () => ({
        _id: { type: studentType }
    })
})
const jobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        postingDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        description: { type: GraphQLString },
        companyID: { type: companyType },
        companyName: { type: GraphQLString },
        appliedStudents: { type: GraphQLList(appliedStudentsType) },
        category: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: studentType,
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let user = await Student.findById({ _id: args.user_id });
                if (user) {
                    console.log("student", user);
                    return user;
                }
            }
        },
        company: {
            type: companyType,
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let user = await Company.findById({ _id: args.user_id });
                if (user) {
                    console.log("company", user);
                    return user;
                }
            }
        },
        companyJobs: {
            type: GraphQLList(jobType),
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let jobs = await Job.find({ companyID: args.user_id }).populate("appliedStudents._id");
                if (jobs) {
                    // console.log("company jobs", jobs);
                    return jobs;
                }
            }
        },
        getAllStudents: {
            type: GraphQLList(studentType),
            async resolve(parent, args) {
                let students = await Student.find({});
                console.log("students", students);
                return students;
            }
        },
        getAllJobs: {
            type: GraphQLList(jobType),
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let jobs = await Job.find({ "appliedStudents._id": { $ne: args.user_id } }).populate("companyID");
                if (jobs) {
                    console.log("all jobs", jobs);
                    return jobs;
                }
            }
        },
        getAppliedJobs: {
            type: GraphQLList(jobType),
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let jobs = await Job.find({ "appliedStudents._id": args.user_id }).populate("companyID");
                if (jobs) {
                    console.log("applied jobs", jobs);
                    return jobs;
                }
            }
        },
        getOtherStudents: {
            type: GraphQLList(studentType),
            args: {
                user_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let students = await Student.find({ _id: { $ne: args.user_id } });
                return students;
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        student_login: {
            type: ResponseType,
            args: {
                email_id: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return studentLogin(args);
            }
        },
        updateStudentCareerObjective: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                careerObjective: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("career args", args)
                return updateCareerObjective(args);
            }
        },
        updateStudentBasicDetails: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                name: { type: GraphQLString },
                city: { type: GraphQLString },
                school: { type: GraphQLString }
            },
            async resolve(parent, args) {
                // console.log("career args", args)
                return updateBasicDetails(args);
            }
        },
        updateStudentEducation: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                location: { type: GraphQLString },
                degree: { type: GraphQLString },
                passingYear: { type: GraphQLString },
                school: { type: GraphQLString }
            },
            async resolve(parent, args) {
                // console.log("career args", args)
                return updateEducation(args);
            }
        },
        updateStudentExperience: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                companyName: { type: GraphQLString },
                title: { type: GraphQLString },
                location: { type: GraphQLString },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            async resolve(parent, args) {
                // console.log("career args", args)
                return updateExperience(args);
            }
        },
        company_login: {
            type: ResponseType,
            args: {
                email_id: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return companyLogin(args);
            }
        },
        updateCompanyContact: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return updateCompanyContact(args);
            }
        },
        updateCompanyDetails: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                companyName: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return updateCompanyDetails(args);
            }
        },
        addCompanyJob: {
            type: ResponseType,
            args: {
                companyID: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                companyName: { type: GraphQLString },
                title: { type: GraphQLString },
                salary: { type: GraphQLString },
                postingDate: { type: GraphQLString },
                deadline: { type: GraphQLString },
                category: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return addCompanyJob(args);
            }
        },
        applyJob: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                job_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return applyJob(args);
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});