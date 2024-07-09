import config from "../configs/db_config.js";
import pkg from 'pg';
const {Client} = pkg;

export default class Query{

    async Query(query, values = undefined){
        let ret = null;
        const client = new Client(config);
        try{
            await client.connect(); 
            const result = await client.query(query, values);
            ret = result;
        }
        catch(error){
            console.log(error);
        }
        finally{
            await client.end();
            return ret;
        }
    }

}