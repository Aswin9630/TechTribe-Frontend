
const isEmailAndPasswordValid = (email,password)=>{
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}:"<>?,.|])[A-Za-z\d!@#$%^&*(){}:"<>?,.|]{8,20}$/;

    let EmailError = !emailRegex.test(email) ? "Email is not valid" : null ;
    let PasswordError = !passwordRegex.test(password) ? "Password is not valid (should include Upper case,special characters & min 8 characters)" : null ;

  
    return {EmailError, PasswordError};
}
export default isEmailAndPasswordValid;