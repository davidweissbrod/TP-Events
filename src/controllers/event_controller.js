import {Router} from 'express';
import EventService from 'src/services/event_service.js'
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
