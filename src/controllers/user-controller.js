import {Router} from 'express';
import UserService from '../servicies/user_service.js'
import AuthMiddleware from '../middlewares/auth_middleware.js';
const router = Router();
const svc = new UserService();
const middleware = new AuthMiddleware();


router.post('/api/user/register', middleware.AuthMiddleware, async (req, res) => {
    let ret = await svc.register(new Users (1, req.body.first_name, req.body.last_name, req.body.username, req.body.password));
    if(ret){
        ret = res.status(201).send("Creado");
    }
    else{
        ret = res.status(400).send(respuesta);
    }   
    return ret;
})

router.post('/api/user/login', middleware.AuthMiddleware, async (req, res) => {
    let ret; 
    const array = await svc.login(req.body.username, req.body.password)
    if(array.success){   
        ret = res.status(201).json(array)
    } else{
        ret = res.status(400).json(array)
    }
    return ret;
})

router.get('/api/user', middleware.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.getUserByUsernamePassword(req.body.username, req.body.password)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(401).send('Usuario inexistente')
    }
    return ret;
})

router.get('/validartoken', middleware.AuthMiddleware, async (req, res) => {
    return res.status(200).send("Token Valido");
});

export default router;
