import {Router} from 'express';
import EventEnrollmentService from 'src/services/event_service.js'
import AuthMiddleware from 'src/middlewares/auth_middleware'
import EventEnrollment from '../entities/event_enrollments.js';
const auth = new AuthMiddleware();
const router = Router();
const svc = new EventEnrollmentService();

router.post(':/id', async (req, res) => {
    let ret;
    const array = svc.enrollUser(req.params.id, req.user.id)
    if(array.status){
        ret = res.status(201).send(array.message)
    } else{
        ret = res.status(400).send(array.message)
    }
})

router.delete(':/id', async (req, res) => {
    let ret;
    const array = svc.deleteEnrollUser(req.params.id, req.user.id)
    if(array.status){
        ret = res.status(201).send(array.message)
    } else{
        ret = res.status(400).send(array.message)
    }
    return ret;
})

router.get(':/id', async (req, res) => {
    let ret;
    const array = svc.getUserEnrolls(req.params.id, req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating)
    if(array != null){
        ret = res.status(200).send(array.message)
    } else{
        ret = res.status(404).send('No se encontro ningun usuario')
    }
    return ret;
})

router.patch(':/id:/rating', async (req, res) => {
    let ret;
    const array = svc.updateRating(req.params.rating, req.body.observations, req.params.idEvent, req.user.id)
    if(array.status){
        ret = res.status(200).send(array.message)
    } else{
        ret = res.status(400).send(array.message)
    }
    return ret
})