import {Router} from 'express';
import ProvinceService from '../servicies/province_service.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let ret;
    const array = await svc.getAllAsync();
    if(array != null){
        ret = res.status(200).json(array);
    }else{
        ret = res.status(500).send('Error');
    }
    return ret;
});

router.get('/:id', async (req, res) => {
    let ret;
    const array = await svc.getProvinceById(req.params.id);
    if(array != null){
        ret = res.status(200).json(array)
    }else{
        ret = res.status(500).send('Error')
    }
    return ret
});

router.post('', async(req,res) => {
    let ret;
    ret = await svc.insertProvince(new Province(req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order))
    if(ret){
        ret = res.status(201).send("Provincia creada")
    }
    else{
        ret = res.status(400).send("Error")
    }
    return ret;
});

router.put('', async(req,res) => {
    let ret
    ret = await svc.updateById(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitudeM, req.body.longitude, req.body.display_order))
    if(ret){
        ret = res.status(201).send("Provincia actualizada")
    }
    else if(!ret){
        ret = res.status(404).send("No se encontro la provincia")
    }
    else{
        ret = res.status(400).send("Bad Request")
    }
    return ret;
});

router.delete('/:id', async(req,res) => {
    let ret
    ret = await svc.deleteProvinceById(req.params.id)
    if(ret){
        ret = res.status(200).send("Eliminado")
    }
    else if(ret === null){
        ret = res.status(401).send("No se puede eliminar esa provincia")
    }
    else{
        ret = res.status(404).send("No se encontro la provincia")
    }
    return ret
});

export default router;
