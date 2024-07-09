import sql_helper from '../helpers/sql-helper'
const helper = new sql_helper();
const {Client} = pkg;

export default class EventLocationRepository {
    getAllAsync = async () => {
        const sql = 'SELECT * FROM event_locations WHERE id_creator_user = $1'
        const values = [id];
        return await helper.Query(sql, values);
    }

    getEventLocationById = async (id_creator_user, id_location) => {
        const sql = `SELECT * FROM event_locations WHERE id_creator_user = $1 AND id = $2`;
        const values = [id_creator_user, id_location];
        return await helper.Query(sql, values);
    }

    insertEventLocation = async (ev_loc) => {
        const sql = 'INSERT INTO public.event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)' 
        const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_address, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user];
        return await helper.Query(sql, values);
    }

    updateEventLocation = async (ev_loc) => {
        const sql = 'UPDATE public.event_location SET id_location = $1, name = $2, full_adress = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7' 
        const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_adress, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user]
        return await helper.Query(sql, values);
    }

    deleteEventLocation = async (id, id_creator_user) => {
        const sql = `DELETE FROM event_locations WHERE id = $1 and id_creator_user = $2`
        const values = [id, id_creator_user];
        return await helper.Query(sql, values);
    }
}