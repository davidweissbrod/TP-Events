import {Router} from 'express';
import EventEnrollmentService from 'src/services/event_service.js'
import AuthMiddleware from 'src/middlewares/auth_middleware'
import EventEnrollment from '../entities/event_enrollments.js';
import ValidacionesHelper from 'src/helpers/validaciones-helper'
const auth = new AuthMiddleware();
const router = Router();
const svc = new EventEnrollmentService();

router.patch('/api/event/{id}/enrollment/{entero}', AuthMiddleware, async (req, res) => {
    try{
        const array = await updateEventEnrollment(new EventEnrollment(req.body.id_event, req.body.id_user, req.body.descripction, req.body.registration_date_time, req.body.attended, req.body.observations, req.body.rating))
        const todayDate = new Date();
        if(array != null){
            ret = res.status(200).json(array)
        } else if(req.body.id_user != req.params.id || todayDate < start_date || ValidacionesHelper.valuesBetween1And10(1, 10)){
            ret = res.status(400).send('Error')
        } else if(req.body.id_user == null){
            ret = res.status(404).send('No se encontro el id')
        }
    } catch{
        ret = res.status(401).send('El usuraio no esta auntenticado');
    }
    return ret
})

router.post('/:id/enrollment', auth.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.registerUserFromEvent(req.params.id, req.user)
    if(array.status){
        ret = res.status(200).send(array.message)
    } else{
        ret = res.status(400).send(array.message);
    }
})

export default router;