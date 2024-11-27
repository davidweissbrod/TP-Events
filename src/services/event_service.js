import EventRepository from '../repositories/event_repository.js'; 
import Validaciones from '../helpers/validaciones-helper.js';


const valHelp = new Validaciones();

export default class EventService {

    
    getAsync = async(name, category, startdate, tag) => {
        const repo = new EventRepository();
        let sql = 'WHERE ';
        
        // Agregar condiciones según los parámetros recibidos
        if (name != null) {
            sql += `name ILIKE '%${name}%' AND `;
        }
        if (category != null) {
            sql += `id_event_category = ${category} AND `;
        }
        if (startdate != null) {
            sql += `start_date = '${startdate}' AND `;
        }
        if (tag != null) {
            sql += `tag ILIKE '%${tag}%' AND `;
        }

        // Eliminar el último 'AND'
        sql = sql.substring(0, sql.length - 3);

        return await repo.getAsync(sql);  // Llamar al repositorio para obtener los eventos filtrados
    }

    // Obtener todos los eventos con paginación (por defecto, página 1)
    getAllAsync = async(page = 1) => {
        const repo = new EventRepository();
        return await repo.getAllAsync(page);  // Obtener todos los eventos desde el repositorio
    }

    // Obtener un evento por su ID
    getEventById = async(id) => {
        const repo = new EventRepository();
        return await repo.getById(id);  // Llamar al repositorio para obtener el evento por ID
    }

    // Crear un nuevo evento
    createEvent = async(event) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos inválidos"
        }

        // Validar el nombre y descripción del evento
        if (valHelp.getValidatedString(event.name) && valHelp.getValidatedString(event.description)) {
            // Crear el evento en la base de datos
            await repo.createEvent(event);
            obj.status = true;
            obj.message = "Evento creado con éxito";
        }
        return obj;
    }

    // Actualizar un evento existente
    updateEvent = async(event) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos inválidos"
        }

        // Validar si el evento existe
        const validatedEvent = await this.getEventById(event.id);
        if (validatedEvent != null) {
            // Validar el nombre y descripción del evento
            if (valHelp.getValidatedString(event.name) && valHelp.getValidatedString(event.description)) {
                // Actualizar el evento en la base de datos
                await repo.updateEvent(event);
                obj.status = true;
                obj.message = "Evento actualizado con éxito";
            }
        } else {
            obj.message = "No se encontró el evento";
        }
        return obj;
    }

    // Eliminar un evento por su ID
    deleteEventById = async(id) => {
        const repo = new EventRepository();
        let obj = {
            status: false,
            message: "Datos inválidos"
        }

        // Validar si el evento existe
        const validatedEvent = await this.getEventById(id);
        if (validatedEvent != null) {
            // Eliminar el evento de la base de datos
            await repo.deleteEventById(id);
            obj.status = true;
            obj.message = "Evento eliminado con éxito";
        } else {
            obj.message = "No se encontró el evento";
        }
        return obj;
    }
}
