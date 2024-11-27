import Token from '../auth/token.js'; 

const tokenService = new Token();

export default class AuthMiddleware{
    AuthMiddleware = (req, res, next) => {
        console.log(req.headers)
       /* const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const payload = tokenService.decryptToken(token);
        if (!payload) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    
        req.user = payload;
        next();*/
    };
    
}





