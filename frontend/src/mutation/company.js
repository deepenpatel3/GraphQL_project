import { gql } from 'apollo-boost';

const companyLogin = gql`
    mutation company_login($email_id: String, $password: String){
        company_login(email_id: $email_id, password: $password){
            success
            message
        }
    }
`;
const updateCompanyContact = gql`
    mutation updateCompanyContact($user_id: String, $email: String, $phone: String){
        updateCompanyContact(user_id: $user_id, email: $email, phone:$phone){
            success
            message
        }
    }
`;

const updateCompanyDetails = gql`
    mutation updateCompanyDetails($user_id: String, $companyName: String, $location: String, $description: String){
        updateCompanyDetails(user_id: $user_id, companyName: $companyName, location:$location, description:$description){
            success
            message
        }
    }
`;

const addCompanyJob = gql`
    mutation addCompanyJob($companyID: String, $companyName: String,  $title: String, $postingDate: String, $deadline: String, $salary: String, $location: String, $description: String, $category: String){
        addCompanyJob(companyID: $companyID, companyName: $companyName, location:$location, description:$description, title:$title, postingDate:$postingDate, deadline:$deadline,salary:$salary , category:$category){
            success
            message
        }
    }
`;
export { companyLogin, updateCompanyContact, updateCompanyDetails, addCompanyJob };