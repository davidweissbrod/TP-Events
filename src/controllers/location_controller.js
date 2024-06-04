import {Router} from 'express';
import LocationService from 'src/services/user-service.js'
const router = Router();
const svc = new LocationService();

router.get('/api/location', async (req, res) => {
    let res;
    const array = await svc.getAllAsync();
    if(array != null){
        res = res.status(200).json(array);
    }else{
        res = res.status(500).send('Error');
    }
    return res;
});

router.get('/api/location/{id}', async (req, res) => {
    let ret;
    const array = await svc.getLocationById(req.params.id);
    if(array != null){
        ret = res.status(200).json(array)
    }else{
        ret = res.status(500).send('Error')
    }
    return ret
});

router.get('/api/location/{id}/event-location', async (req, res) => { //FALTA HACER LA AUTENTICACION DE ESTE 
    let ret;
    const array = await svc.getEventLocationById(req.params.id);
    if(array != null){
        ret = res.status(200).json(array)
    }else{
        ret = res.status(404).send('No se encontro')
    }
    return ret
});

export default router;