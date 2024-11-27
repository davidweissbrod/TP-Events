import { Router } from 'express';
import EventService from '../services/event_service.js';  
import Event from '../entities/events.js';
import AuthMiddleware from '../middlewares/auth_middleware.js';

const router = Router();
const svc = new EventService();
const middleware = new AuthMiddleware();

// Obtener todos los eventos
router.get('/event/', async (req, res) => {
    let ret;
    const array = await svc.getAllAsync();
    if (array != null) {
        ret = res.status(200).json(array);  // Enviar JSON con los eventos
    } else {
        ret = res.status(500).send('No se encontraron eventos');
    }
    return ret;
});

// Buscar eventos con parámetros
router.get('/search', async (req, res) => {
    let ret;
    const array = await svc.getAsync(req.query.name, req.query.category, req.query.startdate, req.query.tag);
    if (array != null) {
        ret = res.status(200).json(array);  // Enviar JSON con los eventos filtrados
    } else {
        ret = res.status(404).send('No se encontró el evento');
    }
    return ret;
});

// Obtener un evento por ID
router.get('/event/:id', async (req, res) => {
    let ret;
    const array = await svc.getEventById(req.params.id);  // Usar req.params.id para obtener el parámetro de ruta
    if (array != null) {
        ret = res.status(200).json(array);  // Enviar JSON con el evento
    } else {
        ret = res.status(404).send('No se encontró el evento con ese ID');
    }
    return ret;
});

// Buscar participantes en un evento (filtros opcionales)
router.get('/event/:id/participants', async (req, res) => {
    let ret;
    const array = await svc.getParticipants(req.params.id, req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating);
    if (array != null) {
        ret = res.status(200).json(array);  // Enviar JSON con los participantes encontrados
    } else {
        ret = res.status(404).send('No se encontraron participantes');
    }
    return ret;
});

// Crear un nuevo evento (requiere autenticación)
router.post('', middleware.AuthMiddleware(), async (req, res) => {
    let ret;
    const newEvent = new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id);

    const result = await svc.insertEvent(newEvent);

    if (result.status) {
        ret = res.status(201).send(result.message);  // Evento creado con éxito
    } else {
        ret = res.status(400).send(result.message);  // Error al crear evento
    }
    return ret;
});

// Actualizar un evento existente (requiere autenticación)
router.put('', middleware.AuthMiddleware(), async (req, res) => {
    let ret;
    const updatedEvent = new Event(0, req.body.name, req.body.description, req.body.id_event_category, 
        req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, 
        req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id);

    const result = await svc.updateEvent(updatedEvent);

    if (result.status) {
        ret = res.status(200).send(result.message);  // Evento actualizado con éxito
    } else {
        ret = res.status(400).send(result.message);  // Error al actualizar evento
    }
    return ret;
});

// Eliminar un evento por ID (requiere autenticación)
router.delete('/:id', middleware.AuthMiddleware(), async (req, res) => {
    let ret;
    const result = await svc.deleteEventById(req.params.id);  // Usar req.params.id para obtener el parámetro de ruta
    if (result.status) {
        ret = res.status(200).send(result.message);  // Evento eliminado con éxito
    } else {
        ret = res.status(400).send(result.message);  // Error al eliminar evento
    }
    return ret;
});

export default router;
