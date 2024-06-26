import TokenHelper from './auth/token.js'
import LoginResponseDTO from '../entities/LoginResponse.js'
import RegistrationResponseDTO from '../entities/RegistrationResponse'
import UserService from './user_service.js'


login = async (username, password) => {
    let ret = new LoginResponseDTO();
    const userService = new UserService();
    const user = await userService.getUserByUsernamePassword(username, password)
    if(user != null){
        ret.token = TokenHelper.generateToken(user)
        ret.success = true;
    } else {
        ret.message = "Usuario Invalido"
    }
    return ret;
}

registration = async (us) => {
    let ret = new RegistrationResponseDTO();
    const userService = new UserService();
    const user = await userService.insertUser(us)
    if(user != null){
        ret.success = true
        ret.token = TokenHelper.generateToken(user)
    } else{
        ret.message = "No se pudo crear el usuario"
    }
    return ret;
}