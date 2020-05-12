import { gql } from 'apollo-boost';

const studentLogin = gql`
    mutation student_login($email_id: String, $password: String){
        student_login(email_id: $email_id, password: $password){
            success
            message
        }
    }
`;
const updateStudentCareerObjective = gql`
    mutation updateStudentCareerObjective($user_id: String, $careerObjective: String){
        updateStudentCareerObjective(user_id: $user_id, careerObjective: $careerObjective){
            success
            message
        }
    }
`;

const updateStudentEducation = gql`
    mutation updateStudentEducation($user_id: String, $school: String, $location: String, $passingYear: String, $degree: String ){
        updateStudentEducation(user_id: $user_id, school: $school, location:$location, passingYear:$passingYear, degree:$degree ){
            success
            message
        }
    }
`;

const updateStudentExperience = gql`
    mutation updateStudentExperience($user_id: String, $title: String, $location: String, $companyName: String, $startDate: String , $endDate: String, $description: String){
        updateStudentExperience(user_id: $user_id, title: $title, location:$location, companyName:$companyName, startDate:$startDate, endDate:$endDate,description:$description  ){
            success
            message
        }
    }
`;

const updateStudentBasicDetails = gql`
    mutation updateStudentBasicDetails($user_id: String, $name:String,  $city: String, $school: String){
        updateStudentBasicDetails(user_id: $user_id, name: $name, city: $city, school: $school){
            success
            message
        }
    }
`;

const applyJob = gql`
    mutation applyJob($user_id: String, $job_id: String){
        applyJob(user_id: $user_id, job_id: $job_id){
            success
            message
        }
    }
`;
export { updateStudentCareerObjective, studentLogin, updateStudentBasicDetails, updateStudentEducation, updateStudentExperience, applyJob };