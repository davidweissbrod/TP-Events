class RegistrationResponseDTO {
    first_name = ""
    last_name = ""
    username = ""
    password = ""
    message = ""
    token = ""
    success = false

    RegistrationResponse(first_name, last_name, username, password, message, token, success){
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.message = message;
        this.token = token;
        this.success = success;
    }
}

export default RegistrationResponseDTO;