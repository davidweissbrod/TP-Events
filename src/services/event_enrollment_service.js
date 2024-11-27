import EventsEnrollmentRepository from '../repositories/event_enrollment_repository.js';
import EventService from './event_service.js';
import BD_Helper from '../helpers/sql-helper.js';

export default class EventsEnrollmentService {

    getUserEnrolls = async (id, first_name, last_name, username, attended, rating) => {
        const repo = new EventsEnrollmentRepository();
        let sql = `
            SELECT users.id, users.first_name, users.last_name, users.username
            FROM users
            JOIN event_enrollments ON users.id = event_enrollments.id_user
            WHERE event_enrollments.id_event = $1
        `;
        const params = [id];

        if (first_name) {
            sql += ` AND users.first_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(first_name);
        }
        if (last_name) {
            sql += ` AND users.last_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(last_name);
        }
        if (username) {
            sql += ` AND users.username ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(username);
        }
        if (attended !== undefined) {
            sql += ` AND event_enrollments.attended = $${params.length + 1}`;
            params.push(attended);
        }
        if (rating !== undefined) {
            sql += ` AND event_enrollments.rating >= $${params.length + 1}`;
            params.push(rating);
        }

        return await repo.getUsersEnrolls(sql, params);
    };

    enrollUser = async (idEvent, idUser) => {
        const obj = {
            status: false,
            message: ""
        };

        const repo = new EventsEnrollmentRepository();
        const eventSvc = new EventService();
        const event = await eventSvc.getEventById(idEvent);
        const currentDate = new Date();
        const eventStartDate = new Date(event.start_date);

        if (currentDate >= eventStartDate) {
            obj.message = 'El evento ya ha comenzado';
            return obj;
        }
        if (!event.enabled_for_enrollment) {
            obj.message = 'El evento no está habilitado para inscripciones';
            return obj;
        }

        // Verificar si el usuario ya está inscrito en el evento
        const sql = 'SELECT COUNT(*) FROM event_enrollments WHERE id_user = $1 AND id_event = $2';
        const values = [idUser, idEvent];
        const existingEnrollment = await BD_Helper.Query(sql, values);
        const isAlreadyEnrolled = parseInt(existingEnrollment.rows[0].count, 10) > 0;

        if (isAlreadyEnrolled) {
            obj.message = 'El usuario ya está inscrito en este evento';
            return obj;
        }

        // Inscribir al usuario
        const res = await repo.enrollUser(idEvent, idUser, currentDate);
        if (res.rowCount > 0) {
            obj.status = true;
            obj.message = 'El usuario fue inscrito exitosamente en el evento';
        } else {
            obj.message = 'No se pudo inscribir al usuario en el evento';
        }

        return obj;
    };

    deleteEnrollUser = async (idEvent, idUser) => {
        const obj = {
            status: false,
            message: ""
        };

        const repo = new EventsEnrollmentRepository();
        const eventSvc = new EventService();
        const event = await eventSvc.getEventById(idEvent);
        const currentDate = new Date();
        const eventStartDate = new Date(event.start_date);

        if (currentDate >= eventStartDate) {
            obj.message = 'El evento ya ha comenzado';
            return obj;
        }

        // Verificar si el usuario está inscrito en el evento
        const sql = 'SELECT COUNT(*) FROM event_enrollments WHERE id_user = $1 AND id_event = $2';
        const values = [idUser, idEvent];
        const existingEnrollment = await BD_Helper.Query(sql, values);
        const isEnrolled = parseInt(existingEnrollment.rows[0].count, 10) > 0;

        if (!isEnrolled) {
            obj.message = 'El usuario no está inscrito en este evento';
            return obj;
        }

        // Eliminar la inscripción del usuario
        const res = await repo.deleteEnrollUser(idEvent, idUser);
        if (res.rowCount > 0) {
            obj.status = true;
            obj.message = 'El usuario fue eliminado exitosamente del evento';
        } else {
            obj.message = 'No se pudo eliminar al usuario del evento';
        }

        return obj;
    };

    updateRating = async (rating, observation, idEvent, idUser) => {
        const obj = {
            status: false,
            message: ""
        };

        const repo = new EventsEnrollmentRepository();
        const eventSvc = new EventService();
        const event = await eventSvc.getEventById(idEvent);
        const currentDate = new Date();
        const eventStartDate = new Date(event.start_date);

        if (currentDate < eventStartDate) {
            obj.message = 'El evento aún no ha terminado';
            return obj;
        }

        if (rating < 1 || rating > 10) {
            obj.message = 'El valor del rating debe estar entre 1 y 10';
            return obj;
        }

        const res = await repo.updateRating(rating, observation, idEvent, idUser);

        if (res.rowCount > 0) {
            obj.status = true;
            obj.message = 'El rating fue actualizado con éxito';
        } else {
            obj.message = 'No se pudo actualizar el rating';
        }

        return obj;
    };
}
