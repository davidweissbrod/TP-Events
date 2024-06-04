import {Router} from 'express';
import EventLocationService from 'src/services/event_location_service.js'
const router = Router();
const svc = new EventLocationService();

app.get('/api/event-location', async (req, res) => {
    let ret;
    const array = await svc.getAllAsync();
    if(array != null){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('Error');
    }
    return res;
})

app.get('/api/event-location/{id}', async (req, res) => {
    let ret;
    const array = await svc.getEventLocationById(req.params.id)
    if(array != null){
        ret = res.status(200).json(array)
    } else{
        ret = res.status(404).send('No se encontro')
    }
})

app.post('/api/event-location/', async (req, res) => {
    let ret;
    ret = await svc.insertEventLocation(new EventLocation(req.body.id_location, req.body.name, req.body.full_adress, req.body.max_capacity, req.body.latitude, req.body.longitude, req.body.id_creator_user))
    if(ret){
        ret = res.status(200).send('Creado')
    } else if(getValidateString(req.body.name) || getValidateString(req.body.full_adress)){
        ret = res.status(400).send('Bad request')
    }
})

app.put('/api/event-location/', async (req, res) => {
    let ret; 
    ret = await svc.updateEventLocation(new EventLocation(req.body.id_location, req.body.name, req.body.full_adress, req.body.max_capacity, req.body.latitude, req.body.longitude, req.body.id_creator_user))
    if(ret){
        ret = res.status(200).send('Actualizado')
    } else if(getValidateString(req.body.name) || getValidateString(req.body.full_adress)){
        ret = res.status(400).send('Bad request')
    }
})

app.delete('/api/event-location/{id}', async (req, res) => {
    let ret;
    ret = await svc.deleteEventLocation(req.params.id)
    if(ret){
        ret = res.status(200).send('Borrado')
    } else {
        ret = res.status(404).send('No se encontro')
    }
})

export default router;