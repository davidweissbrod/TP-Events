import AuthHelper from "../auth/token.js"

export default AuthMiddleware = async (req, res, next) => {
    let authHeader;
    let payload;
    let res; 
    authHeader = req.headers.authorization;
    
    if(!authHeader) {
        res = res.status(401).send('Es necesario un token')
    }
    else{
        const authHelper = new AuthHelper();
        payload = await authHelper.decryptToken(authHeader);
    
        if(payload != null){
            req.user = payload;
            next();
        }
        else{
            res = res.status(401).send('Token invalido');
        }
    }
    return res;
}


