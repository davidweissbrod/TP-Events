import BD_Helper from "../helpers/query-sql-helper.js"
const PQ = new BD_Helper();

export default class UsersRepository{
    getAllAsync = async () => {
        const sql = 'SELECT * FROM public.users'
        let response = await PQ.Query(sql);
        return response.rows;
    }
    getUserById = async (id) => {
        const sql = 'SELECT * FROM public.users WHERE id = $1'
        const values = [id];
        const response = await PQ.Query(sql, values);
        return response.rows[0];
    }
    getUserByUsername = async (username) => {
        const sql = 'SELECT * FROM public.users WHERE username = $1'
        const values = [username];
        const response = await PQ.Query(sql, values);
        return response.rows[0];
    }
    insertUser = async (user) => {
        const sql = 'INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)'
        const values = [user.first_name, user.last_name, user.username, user.password]
        const response = await PQ.Query(sql, values);
        if(response.rowCount != 0){
            return true;
        }
        else{
            return false;
        }
    }
}