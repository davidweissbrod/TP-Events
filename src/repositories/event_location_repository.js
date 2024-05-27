import config from "src/configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class EventLocationRepository {
    getAllAsync = async () => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events'
            const result = await client.query(sql)
            array = result.rows;
        }
        catch (error){
            console.log(error)
        }
        finally {
            await client.end()
        }
        return array
    }

    getEventLocationById = async (id) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM event_location WHERE id=$1'
            const values = [id]
            const result = await client.query(sql, values)
            array = result.rows
        }
        catch (error){
            console.log(error)
        }
        finally {
            await client.end()
        }
        return array
    }

    insertEventLocation = async (ev_loc) => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'INSERT INTO public.event_location (id_location, name, full_adress, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)'
            const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_adress, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user]
            const result = await client.query(sql, values)
            return true
        }
        catch (error){
            console.log(error)
            return false
        }
        finally {
            await client.end()
        }
    }

    updateEventLocation = async (ev_loc) => {
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE public.event_location SET id_location = $1, name = $2, full_adress = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7'
            const values = [ev_loc.id_location, ev_loc.name, ev_loc.full_adress, ev_loc.max_capacity, ev_loc.latitude, ev_loc.longitude, ev_loc.id_creator_user]
            const result = await client.query(sql, values)
            if(result.rowCount == 0){
                return false
            }
            return true
        }
        catch (error){
            console.log(error)
            return false
        }
        finally {
            await client.end()
        }
    }

    deleteEventLocation = async (id) => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'DELETE FROM event_location WHERE id = $1'
            const values = [id]
            const result = await client.query(sql, values)
            if(result.rowCount == 0){
                return false
            }
            return true
        }   
        catch(error){
            console.log(error)
            return null
        }
        finally {
            await client.end()
        }
    }
}