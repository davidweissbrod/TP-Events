import {Router} from 'express';
import LocationService from '../servicies/location_service.js'
import AuthMiddleware from "../middlewares/auth_middleware.js"
const auth = new AuthMiddleware();
const router = Router();
const svc = new LocationService();

router.get('', async (req, res) => {
    let ret;
    const array = await svc.getLocations(req.body.page);
    if(array.status){
        ret = res.status(201).json(array);
    } else{
        ret = res.status(400).send(array.message)
    }
    return ret;
});
router.get('/:id', async (req, res) => {
    let ret;
    const array = await svc.getLocationById(req.params.id);
    if(array.status){
        ret = res.status(201).json(array);  
    }
    else{
        ret = res.status(404).send(array.message);
    }
    return ret;
});

router.get('/:id/event-location', auth.AuthMiddleware, async (req, res) => {
    let ret;
    const array = await svc.getEventLocationByLocationId(req.params.id, req.user.id);
    if(returnObject.status){
        ret = res.status(201).json(array);  
    }
    else{
        ret = res.status(404).send(array.message);
    }
    return ret;

});

export default router;