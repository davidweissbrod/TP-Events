import PQ_Helper from "../helpers/sql-helper.js";
const help = new PQ_Helper();

export default class LocationRepository{
    getLocations = async (page = 0) => {
        const sql = 'SELECT * FROM locations OFFSET $1 LIMIT 3'
        let values = [(page * 10)];
        return await help.Query(sql, values);
    }
    getLocationById = async (id) => {
        const sql = 'SELECT * FROM locations WHERE id = $1'
        let values = [id];
        return await help.Query(sql, values);
    }
    getEventLocationByLocationId = async (id_location, id_creator_user) => {
        const sql = 'SELECT * FROM event_locations WHERE id_location = $1 AND id_creator_user = $2'
        let values = [id_location, id_creator_user];
        return await help.Query(sql, values);
    }
}