import jwt from 'jsonwebtoken';

const options = {
    expiresIn: '7d',
    issuer: 'TLT',
};

const key = "#Secreto";

export default class Token {
    generateToken(payload) {
        const token = jwt.sign(payload, key, options);
        return token;
    }
    decryptToken(token) {
        try {
            const payload = jwt.verify(token, key);
            return payload; 
        } catch (e) {
            console.log(e); 
            return null; 
        }
    }
}
