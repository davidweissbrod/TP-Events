import EventLocationRepository from '../repositories/event_location_repository.js';
import validaciones from '../helpers/validaciones-helper.js';

export default class EventLocationService {
    // Obtener todas las ubicaciones de eventos
    getEventLocations = async (id) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        };
        try {
            const res = await repo.getEventLocations(id);
            if (res.rowCount > 0) {
                obj.status = true;
                obj.message = "Se obtuvieron las ubicaciones con éxito";
            } else {
                obj.status = false;
                obj.message = "No se encontraron ubicaciones";
            }
        } catch (error) {
            console.error(error);
            obj.status = false;
            obj.message = "Error interno al obtener las ubicaciones";
        }
        return obj;
    }

    // Obtener una ubicación de evento por ID
    getEventLocationById = async (id_creator_user, id_location) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        };
        try {
            const res = await repo.getEventLocationById(id_creator_user, id_location);
            if (res.rowCount > 0) {
                obj.status = true;
                obj.message = "Ubicación obtenida con éxito";
            } else {
                obj.status = false;
                obj.message = 'No se encontró la ubicación de evento';
            }
        } catch (error) {
            console.error(error);
            obj.status = false;
            obj.message = "Error interno al obtener la ubicación de evento";
        }
        return obj;
    }

    // Insertar una nueva ubicación de evento
    insertEventLocation = async (event_location) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        };
        try {
       
            if (!validaciones.getValidatedString(event_location.name) || !validaciones.getValidatedString(event_location.full_address)) {
                obj.status = false;
                obj.message = "Nombre o dirección inválidos";
                return obj;
            }

            if (event_location.max_capacity <= 0) {
                obj.status = false;
                obj.message = "Capacidad inválida";
                return obj;
            }

            // Insertar ubicación de evento
            const response = await repo.insertEventLocation(event_location);
            if (response.rowCount > 0) {
                obj.status = true;
                obj.message = "Ubicación de evento creada con éxito";
            } else {
                obj.status = false;
                obj.message = "No se pudo crear la ubicación de evento";
            }
        } catch (error) {
            console.error(error);
            obj.status = false;
            obj.message = "Error interno al crear la ubicación de evento";
        }
        return obj;
    }

    // Eliminar una ubicación de evento
    deleteEventLocation = async (id, id_creator_user) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        };
        try {
            // Eliminar ubicación de evento
            const response = await repo.deleteEventLocation(id, id_creator_user);
            if (response.rowCount > 0) {
                obj.status = true;
                obj.message = "Ubicación de evento eliminada con éxito";
            } else {
                obj.status = false;
                obj.message = "No se pudo eliminar la ubicación de evento";
            }
        } catch (error) {
            console.error(error);
            obj.status = false;
            obj.message = "Error interno al eliminar la ubicación de evento";
        }
        return obj;
    }
}
