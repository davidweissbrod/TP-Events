import {Router} from 'express';
import EventLocationService from './services/event_location_service.js'
import EventLocations from '../entities/event_locations.js';
import AuthMiddleware from "../middlewares/auth_middleware.js"
const auth = new AuthMiddleware();
const router = Router();
const svc = new EventLocationService();

app.get('/api/event-location', auth.AuthMiddleware,  async (req, res) => {
    let ret;
    const array = await svc.getAllAsync();
    if(array.status){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('Error');
    }
    return ret;
})

app.get('/api/event-location/{id}', auth.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.getEventLocationById(req.params.id)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send(array.message)
    }
    return ret;
})

app.post('', auth.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.insertEventLocation(new EventLocations(1, req.body.id_location, req.body.name, req.body.full_address, req.body.max_capacity, req.body.latitude, req.body.longitude, req.user.id))
    if(array.status){
        ret =  res.status(201).send(array.message);
    } else{
        ret = res.status(400).send(array.message)
    }
    return ret;
})

app.put('', auth.AuthMiddleware, async (req, res) => {
    let ret; 
    ret = await svc.updateEventLocation(new EventLocation(req.body.id_location, req.body.name, req.body.full_adress, req.body.max_capacity, req.body.latitude, req.body.longitude, req.body.id_creator_user))
    if(ret){
        ret = res.status(200).send('Actualizado')
    } else {
        ret = res.status(400).send('Bad request')
    }
    return ret;
})

app.delete('/api/event-location/{id}', auth.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.deleteEventLocation(req.params.id)
    if(array.status){
        ret = res.status(200).send(array.message)
    } else {
        ret = res.status(404).send(array.message)
    }
    return ret;
})

export default router;