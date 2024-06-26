import {Router} from 'express';
import EventService from 'src/services/event_service.js'
import middleware from '../middlewares/auth_middleware'
const router = Router();
const svc = new EventService();

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
})

router.post('', middleware.AuthMiddleware, async (req, res) => {
    let ret;
    const returnArray = await svc.createEvent(new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id));

    if(returnArray){
        ret = res.status(201).send('Created')
    }
    else{   
        ret = res.status(400).send("Bad Request");
    }
    return ret;
});



export default router;
