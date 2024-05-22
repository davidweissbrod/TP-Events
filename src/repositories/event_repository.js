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
            const sql = 'SELECT * FROM events WHERE last_name=$last_name'
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
            const sql = 'SELECT * FROM events WHERE username=$username'
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
            const sql = 'SELECT * FROM events WHERE attended=$attended'
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
            const sql = 'SELECT * FROM events WHERE rating=$rating'
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
}