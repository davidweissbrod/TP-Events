import {Router} from 'express';
import EventService from 'src/services/event_service.js'
const router = Router();
const svc = new EventService();

router.get('', async (req, res) =>{
    let res;
    const array = await svc.getAllAsync();
    if(array != null){
        res = res.status(200).json(array);
    }else{
        res = res.status(500).send('Error');
    }
    return res;
})