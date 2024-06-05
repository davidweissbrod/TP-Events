import config from "src/configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class EventRepository {
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

    getEventById = async (id) =>{
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE id=$1'
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

    getEventByName = async (name) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE name=$name'
            const values = [name]
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

    getEventByCategory = async (cat) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE category=$cat'
            const values = [cat]
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

    getEventByDate = async (date) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE startdate=$date'
            const values = [date]
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

    getEventByTag = async (tag) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE tag=$tag'
            const values = [tag]
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

    getEventByFirstName = async (first_name) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE first_name=$first_name'
            const values = [first_name]
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

    getEventByLastName = async (last_name) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE last_name=$1'
            const values = [last_name]
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

    getEventByUsername = async (username) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE username=$1'
            const values = [username]
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

    getEventByAttendence = async (attended) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE attended=$1'
            const values = [attended]
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

    getEventByRating = async (rating) => {
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM events WHERE rating=$1'
            const values = [rating]
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

    insertEvent = async (ev) => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'INSERT INTO public.events () VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
            const values = [ev.name, ev.description, ev.id_event_category, ev.id_event_location, ev.start_date, ev.duration_in_minutes, ev.price, ev.enabled_for_enrollments, ev.max_assistance, ev.id_creator_user]
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

    updateEvent = async (ev) => {
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'UPDATE public.events SET name = $1, description = $2, id_event_category = $3, id_event_location =  $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assitance = $9, id_creator_user = $10'
            const values = [ev.name, ev.description, ev.id_event_category, ev.id_event_location, ev.start_date, ev.duration_in_minutes, ev.price, ev.enabled_for_enrollment, ev.max_assistance, ev.id_creator_user]
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

    deleteEventById = async (id) => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'DELETE FROM events WHERE id = $1'
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