import config from "src/configs/dbconfig.js";
import pkg from 'pg';
const {Client} = pkg;


export default class LocationRepository {
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
}
