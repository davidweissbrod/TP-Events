import TokenHelper from './auth/token.js'
import LoginResponseDTO from '../entities/LoginResponse.js'
import UserService from './user_service.js'


login = async (username, password) => {
    let ret = new LoginResponseDTO();
    const userService = new UserService();
    const user = await userService.getUserByUsernamePassword(username, password)
    if(user != null){
        ret.token = TokenHelper.generateToken(user)
        ret.success = true;
    } else {
        ret.message = "Usario Invalido"
    }
    return ret;
}
