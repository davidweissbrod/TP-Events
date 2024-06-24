import {Router} from 'express';
import UserService from 'src/services/user_service.js'
import AuthService from 'src/services/auth_service'
const router = Router();
const svc = new UserService();


router.get('/api/user/register', async (req, res) => {
    let ret;
    const array = await svc.getUserById(req.body.user.id)
    if(array != null){
        ret = res.status(200).json(array + ' OK')
    } else{
        ret = res.status(401).send('Usuario inexistente')
    }
})

router.post('/api/user/login', async (req, res) => {
    let ret; 
    ret = await svc.insertUser(new User(req.body.first_name, req.body.last_name, req.body.username, req.body.password))
    if(ret && emailValidation(req.body.user.email) && getValidateString(req.body.user.first_name) && getValidateString(req.body.user.last_name) && getValidateString(req.body.user.password)){   
        ret = res.status(201).send('Creado')
    } else{
        ret = res.status(400).send('Error')
    }
})

router.get('/api/user', async (req, res) => {
    let ret;
    const array = await svc.getUserByUsernamePassword(req.body.username, req.body.password)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(401).send('Usuario inexistente')
    }
})

export default router;