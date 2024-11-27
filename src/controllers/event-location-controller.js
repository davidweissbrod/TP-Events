import { Router } from 'express';
import EventLocationService from '../services/event_location_service.js';
import EventLocations from '../entities/event_locations.js';
import AuthMiddleware from "../middlewares/auth_middleware.js";

const auth = new AuthMiddleware();
const router = Router();
const svc = new EventLocationService();

// Obtener todas las ubicaciones de eventos
router.get('/event-location', auth.AuthMiddleware, async (req, res) => {
    try {
        const result = await svc.getEventLocations(req.user.id);
        if (result.status) {
            return res.status(200).json(result);
        } else {
            return res.status(400).send(result.message); // Error al obtener ubicaciones
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno en el servidor');
    }
});

// Obtener ubicación de evento por ID
router.get('/event-location/:id', auth.AuthMiddleware, async (req, res) => {
    try {
        const result = await svc.getEventLocationById(req.user.id, req.params.id);
        if (result.status) {
            return res.status(200).json(result);
        } else {
            return res.status(404).send(result.message); // No se encontró la ubicación
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno en el servidor');
    }
});

// Crear una nueva ubicación de evento
router.post('/event-location', auth.AuthMiddleware, async (req, res) => {
    try {
        const eventLocation = new EventLocations(
            1, // Puedes ajustar esto según el ID del creador
            req.body.id_location,
            req.body.name,
            req.body.full_address,
            req.body.max_capacity,
            req.body.latitude,
            req.body.longitude,
            req.user.id // Usamos el id del usuario autenticado
        );
        const result = await svc.insertEventLocation(eventLocation);
        if (result.status) {
            return res.status(201).send(result.message); // Ubicación de evento creada con éxito
        } else {
            return res.status(400).send(result.message); // Error al crear la ubicación de evento
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno en el servidor');
    }
});

// Actualizar una ubicación de evento
router.put('/event-location', auth.AuthMiddleware, async (req, res) => {
    try {
        const eventLocation = new EventLocations(
            req.body.id, // Asegúrate de que el body contenga un id
            req.body.id_location,
            req.body.name,
            req.body.full_address,
            req.body.max_capacity,
            req.body.latitude,
            req.body.longitude,
            req.user.id // El id del usuario que realiza la actualización
        );
        const result = await svc.updateEventLocation(eventLocation);
        if (result.status) {
            return res.status(200).send('Ubicación de evento actualizada'); // Actualización exitosa
        } else {
            return res.status(400).send(result.message); // Error en la actualización
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno en el servidor');
    }
});

// Eliminar una ubicación de evento
router.delete('/event-location/:id', auth.AuthMiddleware, async (req, res) => {
    try {
        const result = await svc.deleteEventLocation(req.params.id, req.user.id);
        if (result.status) {
            return res.status(200).send(result.message); // Eliminación exitosa
        } else {
            return res.status(404).send(result.message); // No se pudo eliminar la ubicación
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno en el servidor');
    }
});

export default router;

