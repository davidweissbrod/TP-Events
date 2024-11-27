import { Router } from 'express';
import LocationService from '../services/location_service.js';
import AuthMiddleware from "../middlewares/auth_middleware.js";

const router = Router();
const svc = new LocationService();
const auth = new AuthMiddleware();


router.get('', async (req, res) => {
    const { page = 1 } = req.query;  
    try {
        const locations = await svc.getLocations(page);
        if (locations.status) {
            return res.status(200).json(locations);  
        } else {
            return res.status(400).send(locations.message);
        }
    } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
        return res.status(500).send('Error interno del servidor');
    }
});

// Obtener una ubicación por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const location = await svc.getLocationById(id);
        if (location.status) {
            return res.status(200).json(location);  
        } else {
            return res.status(404).send(location.message);  
        }
    } catch (error) {
        console.error(`Error al obtener la ubicación con ID ${id}:`, error);
        return res.status(500).send('Error interno del servidor');
    }
});


router.get('/:id/event-location', auth.AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const array = await svc.getEventLocationByLocationId(id, req.user.id);
        if (array.status) {
            return res.status(200).json(array);  
        } else {
            return res.status(404).send(array.message);  
        }
    } catch (error) {
        console.error(`Error al obtener eventos para la ubicación:`, error);
        return res.status(500).send('Error interno del servidor');
    }
});

export default router;
