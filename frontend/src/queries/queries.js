import { gql } from 'apollo-boost';

const studentGetBasicDetails = gql`
    query($user_id: String){
        student(user_id: $user_id){
            profilePic
            name
            city
            school
        }
    }
`;

const studentGetEducation = gql`
    query($user_id: String){
        student(user_id: $user_id){
            educationDetails{
                school
                location
                degree
                passingYear
            }
        }
    }
`;

const studentGetExperience = gql`
    query($user_id: String){
        student(user_id: $user_id){
            experienceDetails{
                companyName
                title
                location
                startDate
                endDate
                description
            }
        }
    }
`;


const studentGetCareerObjective = gql`
    query($user_id: String){
        student(user_id: $user_id){
            careerObjective
        }
    }
`;

const getAllJobs = gql`
    query($user_id: String){
        getAllJobs(user_id: $user_id){
            _id
            title
            salary
            category
            companyName
            postingDate
            deadline
            location 
            title
            description
            companyID{
                companyName
                location
                email
                phone
                description
            }
        }
    }
`;

const getAppliedJobs = gql`
    query($user_id: String){
        getAppliedJobs(user_id: $user_id){
            _id
            title
            category
            salary
            companyName
            postingDate
            deadline
            location 
            title
            description
            companyID{
                companyName
                location
                email
                phone
                description
            }
        }
    }
`;

const getOtherStudents = gql`
    query($user_id: String){
        getOtherStudents(user_id: $user_id){
            name
            city
            educationDetails{
                school
                location
                degree
                passingYear
            }
            experienceDetails{
                companyName
                location
                title
                startDate
                endDate
                description
            }
            email
            careerObjective 
            school

        }
    }
`;


export { studentGetCareerObjective, studentGetEducation, studentGetBasicDetails, studentGetExperience, getAllJobs, getAppliedJobs, getOtherStudents };