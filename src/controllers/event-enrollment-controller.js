import { Router } from 'express';
import EventEnrollmentService from 'src/services/event_service.js';
import AuthMiddleware from 'src/middlewares/auth_middleware';
import EventEnrollment from '../entities/event_enrollments.js';

const auth = new AuthMiddleware();
const router = Router();
const svc = new EventEnrollmentService();

// Enrollar un usuario en un evento
router.post('/:id', auth.AuthMiddleware, async (req, res) => {
    try {
        const response = await svc.enrollUser(req.params.id, req.user.id); // Esperar la respuesta de enrollUser
        if (response.status) {
            return res.status(201).send(response.message); // Enviar mensaje de éxito
        } else {
            return res.status(400).send(response.message); // Enviar mensaje de error
        }
    } catch (error) {
        return res.status(500).send("Error en el servidor"); // Manejo de errores inesperados
    }
});

// Eliminar la inscripción de un usuario en un evento
router.delete('/:id', auth.AuthMiddleware, async (req, res) => {
    try {
        const response = await svc.deleteEnrollUser(req.params.id, req.user.id); // Esperar la respuesta de deleteEnrollUser
        if (response.status) {
            return res.status(200).send(response.message); // Enviar mensaje de éxito
        } else {
            return res.status(400).send(response.message); // Enviar mensaje de error
        }
    } catch (error) {
        return res.status(500).send("Error en el servidor"); // Manejo de errores inesperados
    }
});

// Obtener las inscripciones de un usuario
router.get('/:id', auth.AuthMiddleware, async (req, res) => {
    try {
        const response = await svc.getUserEnrolls(
            req.params.id, 
            req.query.first_name, 
            req.query.last_name, 
            req.query.username, 
            req.query.attended, 
            req.query.rating
        );
        if (response != null) {
            return res.status(200).send(response.message); // Respuesta exitosa
        } else {
            return res.status(404).send('No se encontró ningún usuario'); // Si no se encontró usuario
        }
    } catch (error) {
        return res.status(500).send("Error en el servidor"); // Manejo de errores inesperados
    }
});

// Actualizar la calificación de un evento
router.patch('/:id/:rating', auth.AuthMiddleware, async (req, res) => {
    try {
        const response = await svc.updateRating(
            req.params.rating, 
            req.body.observations, 
            req.params.id, 
            req.user.id
        );
        if (response.status) {
            return res.status(200).send(response.message); // Respuesta exitosa
        } else {
            return res.status(400).send(response.message); // Respuesta de error
        }
    } catch (error) {
        return res.status(500).send("Error en el servidor"); // Manejo de errores inesperados
    }
});

export default router;
