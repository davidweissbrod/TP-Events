import config from "src/configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class EventCategoryRepository {
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

    getCategoryById = async () => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM event_category WHERE id=$1'
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

    insertCategory = async () => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'INSERT INTO public.provinces (name, display_order) VALUES ($1, $2)'
            const values = [event_category.name, event_category.display_order]
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

    updateEventCategory = async () => {
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE public.event_category SET "name" = $1, display_order = $2'
            const values = [event_category.name, event_category.display_order, event_category.id]
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

    deleteEventCategory = async () => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'DELETE FROM event_category WHERE id = $1'
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