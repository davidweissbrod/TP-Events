import jwt from '../auth/token.js'

export default class AuthService{
    
    Login = async (payload) => {
        const token = await jwt.generateJWT(payload);
        return token;
    }

}