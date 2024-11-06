import {Router} from 'express';
import EventCategoryService from '../servicies/category_service.js'
import EventCategory from '../entities/event_categories.js';
const router = Router();
const svc = new EventCategoryService();

router.get('/api/event-category', async (req, res) => {
    let ret;
    const array = await svc.getAllAsync();
    if(array != null){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('Error');
    }
    return res;
})

router.get('/api/event-category/{id}', async (req, res) => {
    let ret;
    const array = await svc.getCategoryById(req.params.id);
    if(array != null){
        ret = res.status(200).json(array)
    } else {
        ret = res.status(404).send('Id inexistente')
    }
    return ret;
})

router.post('/api/event-category/', async (req, res) => {
    let ret;
    ret = await svc.insertCategory(new EventCategory(req.body.name, req.body.display_order))
    if(ret){
        ret = res.status(201).send("Created")
    }
    else{
        ret = res.status(400).send("Error")
    }
    return ret;
})

router.put('/api/event-category/', async (req, res) => {
    let ret;
    ret = await svc.updateEventCategory(new EventCategory(req.body.name, req.body.display_order))
    if(ret){
        ret = res.status(200).send('Creado')
    } 
    else{
        ret = res.status(404).send('No se encontro el id')
    }
    return ret;
})

router.delete('/api/event-category/{id}', async (req, res) => {
    let ret;
    ret = await svc.deleteEventCategory(req.params.id)
    if(ret){
        ret = res.status(200).send('Borrado')
    } else{
        ret = res.status(404).send('No se encontro el id')
    }
    return ret;
})

export default router;