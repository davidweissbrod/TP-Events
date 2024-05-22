import {Router} from 'express';
import EventService from 'src/services/event_service.js'
const router = Router();
const svc = new EventService();

router.get('/api/event/', async (req, res) =>{
    let res;
    const array = await svc.getAllAsync();
    if(array != null){
        res = res.status(200).json(array);
    }else{
        res = res.status(500).send('Error');
    }
    return res;
})

router.get('/api/event/?name={texto}', async (req, res) => {
    const array = [];
    array = await svc.getEventByName(req.params.name)
    if(array != null){
        array = res.status(200).json(array)
    } else{
        array = res.status(500).send('Error')
    }
})

router.get('/api/event/?category={texto}', async (req, res) => {
    const array = [];
    array = await svc.getEventByCategory(req.params.category)
    if(array != null){
        array = res.status(200).json(array)
    } else{
        array = res.status(500).send('Error')
    }
})

router.get('/api/event/?startdate={fecha YYYY-MM-DD}', async (req, res) => {
    const array = [];
    array = await svc.getEventByDate(req.params.startdate)
    if(array != null){
        array = res.status(200).json(array)
    } else{
        array = res.status(500).send('Error')
    }
})

router.get('/api/event/?tag={texto}', async (req, res) => {
    const array = [];
    array = await svc.getEventByTag(req.params.tag)
    if(array != null){
        array = res.status(200).json(array)
    } else{
        array = res.status(500).send('Error')
    }
})

router.get('/api/event/{id}', async (req, res) => {
    const array = [];
    array = await svc.getEventById(req.params.id)
    if(array != null){
        array = res.status(200).json(array)
    } else{
        array = res.status(404).send('No se encontro el id')
    }
})

