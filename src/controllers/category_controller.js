import {Router} from 'express';
import EventCategoryService from 'src/services/category_service.js'
const router = Router();
const svc = new ProvinceService();

router.get('/api/event-category', async (req, res) => {
    let res;
    const array = await svc.getAllAsync();
    if(array != null){
        res = res.status(200).json(array);
    }else{
        res = res.status(500).send('Error');
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
})

router.post('/api/event-category/', async (req, res) => {
    let ret;
    ret = await svc.insertCategory(new EventCategory(req.body.name, req.body.display_order))
    if(ret){
        ret = res.status(201).send("Created")
    }
    else if(getValidateString(req.body.name)){
        ret = res.status(400).send("El nombre debe tener 3 o mas letras")
    }
    else{
        ret = res.status(400).send("Error")
    }
})

router.put('/api/event-category/', async (req, res) => {
    let ret;
    ret = await svc.updateEventCategory(new EventCategory(req.body.name, req.body.display_order))
    if(ret){
        ret = res.status(200).send('Creado')
    } 
    else if(getValidateString(req.body.name)){
        ret = res.status(400).send('El nombre es invalido')
    } 
    else{
        ret = res.status(404).send('No se encontro el id')
    }
})

router.delete('/api/event-category/{id}', async (req, res) => {
    let ret;
    ret = await svc.deleteEventCategory(req.params.id)
    if(ret){
        ret = res.status(200).send('Borrado')
    } else{
        ret = res.status(404).send('No se encontro el id')
    }
})

export default router;