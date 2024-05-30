import jwt from 'jsonwebtoken'
import user from './src/entities/users.js'
import LoginResponeDTO from '../entities/LoginResponse.js'
import UserService from './user_service.js'
import { use } from 'express/lib/application.js'

function generateToken(user){
    const payload = {
        username: user.username,
        password: user.password
    }
    
    const key = 'Secreto123#'
    
    const options = {
        expiresIn: '7d',
        issuer: 'Events'
    }
    
    const token = jwt.sign(payload, key, options)
    console.log(token)
}

desencryptToken = async (token) => {
    const secretKey = "Secreto123#"
    const token = tokenEncript;
    let payloadOriginal = null

    try{
        payloadOriginal = await jwt.verify(token, secretKey)
    } catch(e){
        console.log(e)
    }   
}

login = async (username, password) => {
    let ret = new LoginResponeDTO();
    const userService = new UserService();
    const user = await userService.getByUsernamePassword(username, password)
    if(user != null){
        ret.token = generateToken(user)
        ret.success = true;
    } else {
        ret.message = "Usario Invalido"
    }
    return ret;
}
