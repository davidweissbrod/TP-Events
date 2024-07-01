import BD_Helper from "../helpers/sql-helper.js"
const PQ = new BD_Helper();


export default class CategoriesRepository{
    getAllAsync = async () => {
        const sql = 'SELECT * FROM tags'
        let ret = PQ.PostgreQuery(sql)
        return ret.rows
    }
    getTagById = async (id) => {
        const sql = 'SELECT * FROM tags WHERE id = $1'
        values = [id]
        let ret = PQ.PostgreQuery(sql, values)
        return ret.rows
    }
    getTagByName = async (name) => {
        const sql = 'SELECT * FROM tags WHERE name = $1'
        values = [name];
        let ret = PQ.PostgreQuery(sql, values)
        return ret.rows
    }
}