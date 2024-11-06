import {Router} from 'express';
import EventService from '../servicies/event_service.js'
import Event from '../entities/events.js';
import AuthMiddleware from '../middlewares/auth_middleware.js'
const router = Router();
const svc = new EventService();
const middleware = new AuthMiddleware();

router.get('/api/event/', async (req, res) =>{
    let ret;
    const array = await svc.getAllAsync();
    if(array != null){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('No se encontraron eventos');
    }
    return ret;
})

router.get('/search', async (req, res) => {
    let ret;
    const array = await svc.getAsync(req.query.name, req.query.category, req.query.startdate, req.query.tag);
    if(array != null){
        ret = res.status(200).json(array);
    }
    else{
        ret = res.status(404).send('No se encontro el evento');
    }
    return ret;
})

router.get('/api/event/{id}', async (req, res) => {
    let ret;
    const array = await svc.getEventById(req.query.id)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('No se encontro el id')
    }
    return ret;
})

router.get('/search', async (req, res) => {
    let ret;
    const array = await svc.getParticipants(req.query.first_name, req.last_name, req.query.username, req.query.attended, req.query.rating)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('No se encontraron participantes') 
    }
    return ret;
})

router.post('', middleware.AuthMiddleware(), async (req, res) => {
        let ret;
        const array = await svc.insertEvent(new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id));

        if(array.status){
            ret = res.status(201).send(array.message)
        }
        else{   
            ret = res.status(400).send(array.message);
        }
    return ret;
});


router.put('', middleware.AuthMiddleware(), async (req, res) => {
        let ret;
        const array = await svc.updateEvent(new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
            req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
            req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id))
        if(array.status){
            ret = res.status(201).send(array.message)
        }
        else{
            ret = res.status(400).send(array.message)
        }
    return ret;
})

router.delete('/:id', middleware.AuthMiddleware(), async (req, res) => {
        let ret;
        const array = await svc.deleteEventById(req.params.id)
        if(array.status){
            ret = res.status(201).send(array.message)
        }
        else{
            ret = res.status(400).send(array.message)
        }
    return ret;
})

export default router;
