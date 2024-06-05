import {Router} from 'express';
import EventService from 'src/services/event_service.js'
import ValidacionesHelper from './helpers/validaciones-helper'
import AuthMiddleware from './middlewares/auth_middleware.js'
import AuthService from './services/auth_service.js'
const router = Router();
const svc = new EventService();

router.get('/api/event/', async (req, res) =>{
    let ret;
    const array = await svc.getAllAsync();
    if(array != null){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('Error');
    }
    return res;
})

router.get('/api/event/?name={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByName(req.query.name)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(500).send('Error')
    }
})

router.get('/api/event/?category={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByCategory(req.query.category)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(500).send('Error')
    }
})

router.get('/api/event/?startdate={fecha YYYY-MM-DD}', async (req, res) => {
    let ret;
    const array = await svc.getEventByDate(req.query.startdate)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(500).send('Error')
    }
})

router.get('/api/event/?tag={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByTag(req.query.tag)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(500).send('Error')
    }
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

router.get('/api/event/{id}/enrollment?first_name={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByFirstName(req.params.first_name)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('Error')
    }
})

router.get('/api/event/{id}/enrollment?last_name={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByLastName(req.params.last_name)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('Error')
    }
})

router.get('/api/event/{id}/enrollment?username={texto}', async (req, res) => {
    let ret;
    const array = await svc.getEventByUsername(req.params.username)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('Error')
    }
})

router.get('/api/event/{id}/enrollment?attended={boolean}', async (req, res) => {
    let ret;
    const array = await svc.getEventByAttendance(req.params.attended)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('Error')
    }
})

router.get('/api/event/{id}/enrollment?rating={entero}', async (req, res) => {
    let ret;
    const array = await svc.getEventByRating(req.params.rating)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('Error')
    }
})

router.post('/api/event/', async (req, res) => {
    let ret;
    const assitance = req.body.max_assitance
    const capacity = req.body.max_capacity
    const price = req.body.price
    const duration = req.body.duration_in_minutes
    ret = await svc.insertEvent(new Event(req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.enabled.for.enrollment, req.body.max_assitance, req.body.id_creator_user))
    if(ret && ValidacionesHelper.getValidatedString(req.body.name) && ValidacionesHelper.getValidatedString(req.body.description) && assitance <= capacity && price > 0 && duration > 0){
        ret = res.status(201).send('Created')
    } else if(AuthService){
        ret = res.status(401).send('Unauthorized')
    } else{
        ret = res.status(400).send('Bad Request')
    }
})

router.put('/api/event/', async (req, res) => {
    let ret;
    const assitance = req.body.max_assitance
    const capacity = req.body.max_capacity
    const price = req.body.price
    const duration = req.body.duration_in_minutes
    ret = await svc.updateEvent(new Event(req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.enabled_for_enrollment, req.body.max_assitance, req.body.id_creator_user))
    if(ret && ValidacionesHelper.getValidatedString(req.body.name) && ValidacionesHelper.getValidatedString(req.body.description) && assitance <= capacity && price > 0 && duration > 0){
        ret = res.status(200).send('Updated')
    } else if(AuthService){
        ret = res.status(401).send('Unauthorized')
    } else{
        ret = res.status(404).send('No se encontro el id')
    }
})

router.delete('/api/event/{id}', async (req, res) => {
    let ret;
    const enabled = req.body.enabled_for_enrollment
    ret = await svc.deleteEventById(req.params.id)
    if(ret){
        ret = res.status(200).send('Borrado')
    } else if(!enabled){
        ret = res.status(400).send('Bad Request')
    } else if(AuthService){
        ret = res.status(401).send('Unauthorized')
    } else {
        ret = res.status(404).send('No se encontro el id')    
    }
})

router.post('/api/event/{id}/enrollment/', async (req, res) => {
    
})

export default router;
