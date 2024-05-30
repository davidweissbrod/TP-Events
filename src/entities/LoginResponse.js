class LoginResponeDTO{
    success = false;
    message = "";
    token = "";

    LoginResponseDTO(success, message, token){
        this.success = success;
        this.message = message;
        this.token = token;
    }
}

export default LoginResponeDTO;