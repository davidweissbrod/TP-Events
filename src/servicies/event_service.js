import EventRepository from '../repositories/category_repository.js'
import VH from '../helpers/validaciones-helper.js'
import EventsEnrollmentService from './event_enrollment_service.js';

export default class EventService {
    getAsync = async(name, category, startdate, tag) => {
        const repo = new EventRepository();
        let sql = 'WHERE ';
        if(name != null){
            sql += `name = '${name}' AND `;
        }
        if(category != null){
            sql += `id_event_category = ${category} AND `;
        }
        if(startdate != null){
            sql += `start_date = '${startdate}' AND `;
        }
        if(tag != null){
            sql += `tag = '${tag}' AND `;
        }
        return await repo.getAsync(sql);
    }
    getAllAsync = async(page = 1) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync(page);
        return returnArray;

    }
    getUsersEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        return EventsEnrollmentService.getUsersEnrolls(id, first_name, last_name, username, attended, rating);
    }
    getEventById = async(id) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getById(id);
        return returnArray;
    }
    createEvent = async(event) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos invalidos"
        }
        if(VH.getValidatedString(event.name) || VH.getValidatedString(event.description)){
            await repo.createEvent(event);
            obj.status = true;
            obj.message = "Evento creado"
        }
        return obj
    }
    updateEvent = async(event) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos invalidos"
        }
        const validatedEvent = await getEventById(event.id) 
        if(validatedEvent != null){
            if(VH.getValidatedString(event.name) || VH.getValidatedString(event.description)){
                await repo.createEvent(event);
                obj.status = true;
                obj.message = "Evento creado"
            }
        } 
        else{
            obj.message = "No se encontro el evento"
        }
        return obj
    }
    deleteEventById = async(id) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos invalidos",
        }
        const validatedEvent = await getEventById(id) 
        if(validatedEvent != null){
            await repo.deleteEventById(id);
            obj.status = true;
            obj.message = "Eliminado con exito";
        }
        else{
            obj.message = "No se encontro el evento";
        }
        return obj;
    }
}