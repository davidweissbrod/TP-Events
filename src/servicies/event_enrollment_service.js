import EventsEnrollmentRepository from '../repositories/event_enrollment_repository.js';
import EventService from './event_service.js'
import BD_Helper from '../helpers/sql-helper.js'

export default class EventsEnrollmentService{

    getUserEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        const repo = new EventsEnrollmentRepository();
        let sql = `
            SELECT users.id, users.first_name, users.last_name, users.username
            FROM users
            JOIN event_enrollments ON users.id = event_enrollments.id_user
            WHERE event_enrollments.id_event = $1
        `
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
            sql += ` AND event_enrollment.attended = $${params.length + 1}`;
            params.push(attended);
        }
        if (rating !== undefined) {
            sql += ` AND event_enrollment.rating > $${params.length + 1}`;
            params.push(rating);
        }
        const array = repo.getUsersEnrolls(sql, params);
        return array;
    }

    enrollUser = async (idEvent, idUser) =>{
        let obj = {
            status: false,
            message: ""
        }
        const repo = new EventsEnrollmentRepository();
        const evSvc = new EventService();
        let event = evSvc.getEventById(idEvent)
        const fechaActual = new Date()
        const fechaIncioEvento = new Date(event.start_date)

        if(fechaActual >= fechaIncioEvento){
            obj.message = 'El evento ya termino'
        }
        else if(!event.enabled_for_enrollment){
            obj.message = 'El evento no esta habilitado'
        }

        const sql = 'select count(*) from event_enrollments where id_user = $1 and id_event = $2'
        const values = [idUs, idEv];
        let enrollments = await BD_Helper.Query(sql, values);
        enrollments = enrollments.rows[0].count;
        if(enrollments != 1){
            obj.message = 'El usuario ya esta registrado en este evento'
        }
        let res = await repo.enrollUser(idEvent, idUser, fechaActual); 
        if(res.rowCount > 0){
            obj.status = true;
            obj.message = 'Se registro correctamente al evento';
        }
        else{
            obj.status = false
            obj.message = 'No se pudo registrar al evento'
        }
        return obj;
    }

    deleteEnrollUser = async (idEvent, idUser) =>{
        let obj = {
            status: false,
            message: ""
        }
        const repo = new EventsEnrollmentRepository();
        const evSvc = new EventService();
        let event = evSvc.getEventById(idEvent)
        const fechaActual = new Date()
        const fechaIncioEvento = new Date(event.start_date)

        if(fechaActual >= fechaIncioEvento){
            obj.message = 'El evento ya termino'
        }
        const sql = 'select count(*) from event_enrollments where id_user = $1 and id_event = $2'
        const values = [idUs, idEv];
        let enrollments = await BD_Helper.Query(sql, values);
        enrollments = enrollments.rows[0].count;
        if(enrollments != 1){
            obj.message = 'El usuario ya esta registrado en este evento'
        }
        
        let res = await repo.deleteEnrollUser(idEvent, idUser);
        if(res.rowCount > 0){
            obj.status = true;
            obj.message = 'El usuario fue eliminado con exito';
        }
        else{
            obj.status = false
            obj.message = 'No se pudo eliminar al usuario'
        }
        return obj 
    }

    updateRating = async (rating, observation, idEvent, idUser) =>{
        let obj = {
            status: false,
            message: ""
        }
        const repo = new EventsEnrollmentRepository();
        const evSvc = new EventService();
        let event = evSvc.getEventById(idEvent)
        const fechaActual = new Date()
        const fechaIncioEvento = new Date(event.start_date)
        if(fechaActual < fechaIncioEvento){
            obj.message = 'El evento todavia no termino'
        }
        else if(rating < 1 || rating > 10){
            obj.message = 'El numero de rating es invalido'
        }
        let res = await repo.updateRating(rating, observation, idEvent, idUser)

        if(res.rowCount > 0){
            obj.status = true
            obj.message = "Se actualizo el rating"
        }
        else{
            obj.message = "No se pudo actualizar el rating"
        }
        return obj
    }
}