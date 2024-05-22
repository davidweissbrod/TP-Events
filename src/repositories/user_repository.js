import config from "src/configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;

export default class UserRepository {
    insertUser = async (user) => {
        const client = new Client(config)
        try{
            await client.connect();
            const sql = 'INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)'
            const values = [user.first_name, user.last_name, user.username, user.password]
            const result = await client.query(sql, values)
            return true
        }
        catch(error){
            console.log(error)
            return false
        }
        finally {
            await client.end()
        }
    }

    getUserById = async (id) =>{
        let array = null
        const client = new Client(config)
        try{
            await client.connect()
            const sql = 'SELECT * FROM users WHERE id=$1'
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
}