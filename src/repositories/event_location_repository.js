import PQ_Helper from '../helpers/sql-helper.js';
const helper = new PQ_Helper();

export default class EventLocationRepository {
    
    // Obtener todas las ubicaciones de eventos de un creador
    getAllAsync = async (id_creator_user) => {
        const sql = 'SELECT * FROM event_locations WHERE id_creator_user = $1';
        const values = [id_creator_user];
        try {
            return await helper.Query(sql, values);
        } catch (error) {
            console.error("Error en getAllAsync:", error);
            throw new Error('Error al obtener ubicaciones de evento');
        }
    };

    // Obtener una ubicación de evento por ID y creador
    getEventLocationById = async (id_creator_user, id_location) => {
        const sql = 'SELECT * FROM event_locations WHERE id_creator_user = $1 AND id = $2';
        const values = [id_creator_user, id_location];
        try {
            return await helper.Query(sql, values);
        } catch (error) {
            console.error("Error en getEventLocationById:", error);
            throw new Error('Error al obtener la ubicación del evento');
        }
    };

    // Insertar una nueva ubicación de evento
    insertEventLocation = async (ev_loc) => {
        const sql = 'INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_address, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user];
        try {
            return await helper.Query(sql, values);
        } catch (error) {
            console.error("Error en insertEventLocation:", error);
            throw new Error('Error al insertar la ubicación del evento');
        }
    };

    // Actualizar una ubicación de evento
    updateEventLocation = async (ev_loc) => {
        const sql = 'UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7 WHERE id = $8';
        const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_address, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user, ev_loc.id];
        try {
            return await helper.Query(sql, values);
        } catch (error) {
            console.error("Error en updateEventLocation:", error);
            throw new Error('Error al actualizar la ubicación del evento');
        }
    };

    // Eliminar una ubicación de evento
    deleteEventLocation = async (id, id_creator_user) => {
        const sql = 'DELETE FROM event_locations WHERE id = $1 AND id_creator_user = $2';
        const values = [id, id_creator_user];
        try {
            return await helper.Query(sql, values);
        } catch (error) {
            console.error("Error en deleteEventLocation:", error);
            throw new Error('Error al eliminar la ubicación del evento');
        }
    };
}
