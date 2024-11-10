import AuthHelper from "../auth/token.js"

export default class AuthMiddleware {

    AuthMiddleware = async (req, res, next) => {
        let authHeader;
        let payload;
        let ret; 
        authHeader = req.headers.authorization;

        if(!authHeader) {
            ret = res.status(401).send('Es necesario un token')
        }
        else{
            const authHelper = new AuthHelper();
            payload = await authHelper.decryptJWT(authHeader);

            if(payload != null){
                req.user = payload;
                next();
            }
            else{
                ret = res.status(401).send('401 Unauthorized, token invalido');
            }
        }
        return ret;
    }
}




