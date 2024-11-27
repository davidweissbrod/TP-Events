import { Router } from 'express';
import UserService from '../services/user_service.js';
import AuthMiddleware from '../middlewares/auth_middleware.js';
const router = Router();
const svc = new UserService();
const middleware = new AuthMiddleware();


router.post('/user/register', async (req, res) => {
    let ret = await svc.register(new Users(1, req.body.first_name, req.body.last_name, req.body.username, req.body.password));
    if (ret) {
        ret = res.status(201).send("Creado");
    } else {
        ret = res.status(400).send("Error al crear el usuario");
    }
    return ret;
});

router.post('/user/login', async (req, res) => {
    let ret;
    const array = await svc.login(req.body.username, req.body.password);
    if (array.success) {
        ret = res.status(201).json(array);  
    } else {
        ret = res.status(400).json(array);
    }
    return ret;
});


router.get('/user', middleware.AuthMiddleware, async (req, res) => {
    const user = req.user;  
    if (user) {
        const userDetails = await svc.getUserByUsername(user.username, user.password);
        if (userDetails) {
            return res.status(200).json(userDetails);
        } else {
            return res.status(401).send('Usuario inexistente');
        }
    } else {
        return res.status(401).send('Usuario no autorizado');
    }
});


router.get('/validartoken', middleware.AuthMiddleware, async (req, res) => {
    return res.status(200).send("Token Valido");
});

export default router;
