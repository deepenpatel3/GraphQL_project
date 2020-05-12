import { gql } from 'apollo-boost';

const companyGetContact = gql`
query($user_id: String){
    company(user_id : $user_id){
        companyName
        email
        phone
        location
        description
    }
}
`;

const companyJobs = gql`
query($user_id: String){
    companyJobs(user_id:$user_id){
        salary
        companyName
        postingDate
        deadline
        location 
        title
        description
        appliedStudents {
            _id{
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
    }
}
`;

const getAllStudents = gql`
    query{
        getAllStudents{
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

export { companyGetContact, companyJobs, getAllStudents };