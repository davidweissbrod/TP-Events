import { Router } from 'express';
import ProvinceService from '../services/province_service.js';
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    try {
        const array = await svc.getAllAsync();
        if (array != null) {
            return res.status(200).json(array);
        }
        return res.status(404).send('Provincias no encontradas');
    } catch (error) {
        return res.status(500).send('Error al obtener provincias');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const array = await svc.getProvinceById(req.params.id);
        if (array != null) {
            return res.status(200).json(array);
        }
        return res.status(404).send('Provincia no encontrada');
    } catch (error) {
        return res.status(500).send('Error al obtener la provincia');
    }
});

router.post('', async (req, res) => {
    try {

        if (!req.body.name || !req.body.latitude || !req.body.longitude) {
            return res.status(400).send('Faltan campos obligatorios');
        }
        const ret = await svc.insertProvince(new Province(req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
        if (ret) {
            return res.status(201).json({ message: "Provincia creada", success: true });
        } else {
            return res.status(400).json({ message: "Error al crear la provincia", success: false });
        }
    } catch (error) {
        return res.status(500).send('Error al crear la provincia');
    }
});

router.put('', async (req, res) => {
    try {
        if (!req.body.id || !req.body.name || !req.body.latitude || !req.body.longitude) {
            return res.status(400).send('Faltan campos obligatorios');
        }
        const ret = await svc.updateById(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
        if (ret) {
            return res.status(200).json({ message: "Provincia actualizada", success: true });
        } else {
            return res.status(404).json({ message: "Provincia no encontrada", success: false });
        }
    } catch (error) {
        return res.status(500).send('Error al actualizar la provincia');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ret = await svc.deleteProvinceById(req.params.id);
        if (ret) {
            return res.status(200).json({ message: "Provincia eliminada", success: true });
        } else {
            return res.status(404).json({ message: "Provincia no encontrada", success: false });
        }
    } catch (error) {
        return res.status(500).send('Error al eliminar la provincia');
    }
});

export default router;

