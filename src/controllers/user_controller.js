import {Router} from 'express';
import UserService from 'src/services/user-service.js'
import AutenticationMiddleware from "../middlewares/AutenticationMiddleware.js"
const router = Router();
const svc = new UserService();
const middleware = new AutenticationMiddleware();



router.post('/api/user/register', async (req, res) => {
    let ret = await svc.Register(new Users (1, req.body.first_name, req.body.last_name, req.body.username, req.body.password));
    if(ret){
        ret = res.status(201).send("Creado");
    }
    else{
        ret = res.status(400).send(respuesta);
    }   
})

router.post('/api/user/login', async (req, res) => {
    let ret; 
    const array = await svc.login(req.body.username, req.body.password)
    if(array.success){   
        ret = res.status(201).json(array)
    } else{
        ret = res.status(400).json(array)
    }
    return ret;
})

router.get('api/user', async (req, res) => {
    let ret;
    const array = await svc.getUserByUsernamePassword(req.body.username, req.body.password)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(401).send('User inexistente')
    }
})

router.get('/validartoken', middleware.AuthMiddleware, async (req, res) => {
    let respuesta = res.status(200).send("Token Valido");
    return respuesta;
});

export default router;