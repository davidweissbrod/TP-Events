import EventRepository from '../repositories/category_repository.js'
import Validaciones from '../helpers/validaciones-helper.js'
import EventsEnrollmentService from './event_enrollment_service.js';
const valHelp = new Validaciones();

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
        sql = sql.substring(0,((sql.length)-3))
        return await repo.getAsync(sql);
    }
    getAllAsync = async(page = 1) =>{
        const repo = new EventRepository();
        return await repo.getAllAsync(page);
    }
    getEventById = async(id) =>{
        const repo = new EventRepository();
        return await repo.getById(id); 
    }
    createEvent = async(event) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos invalidos"
        }
        if(valHelp.getValidatedString(event.name) || valHelp.getValidatedString(event.description)){
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
            if(valHelp.getValidatedString(event.name) || valHelp.getValidatedString(event.description)){
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
            message: "Datos invalidos"
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