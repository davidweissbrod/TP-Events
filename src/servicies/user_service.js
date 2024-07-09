import UserRepository from '../repositories/user_repository.js'
import AuthService from './auth_service.js'
import ValidacionesHelper from '../helpers/validaciones-helper.js'

export default class UserService{
    login = async (username, password) => {
        let objeto = {
            success: false,
            message: "Error de login",
            token: ""
        }     
        const repo = new UserRepository()
        const auth = new AuthService()
        let user = await repo.getUserByUsernamePassword(username, password)
        if (user != null){
            if(user.password === password){
                objeto.success = true;
                objeto.message = "Correcto";
                objeto.token = await auth.login(user);
            }
            else{
                objeto.message = "Contraseña incorrecta";
            }
        }
        else{
            objeto.message = "No se encontro el usuario";
        }
        return objeto;
    }

    register = async (user) => {
        const repo = new UserRepository();
        let ret;
        if (!ValidacionesHelper.getValidatedString(user.first_name) || !ValidacionesHelper.getValidatedString(user.last_name) || !ValidacionesHelper.getValidatedString(user.password)){       
            ret = "El nombre, el apellido o la contraseña no son validos";
        }
        else if (!ValidacionesHelper.emailValidation(user.username)){
            ret = "El Email no es valido";
        }
        else{
            ret = repo.insertUser(user);
        }
        return ret;
    }
}