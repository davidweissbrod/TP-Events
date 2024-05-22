import {Router} from 'express';
import UserService from 'src/services/user-service.js'
const router = Router();
const svc = new ProvinceService();


router.post('/api/user/register', async (req, res) => {
    let ret;
    const array = await svc.getUserById(req.body.user.id)
    if(array != null){
        ret = res.status(200).json(array + ' OK')
    } else{
        ret = res.status(401).send('User inexistente')
    }
})

router.post('/api/user/login', async (req, res) => {
    let ret; 
    ret = await svc.insertUser(req.body.user)
    if(ret && emailValidation(req.body.user.email) && getValidateString(req.body.user.first_name) && getValidateString(req.body.user.last_name) && getValidateString(req.body.user.password)){   
        ret = res.status(201).send('Creado')
    } else{
        ret = res.status(400).send('Error')
    }
})