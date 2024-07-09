import BD_Helper from "../helpers/sql-helper.js"

const PQ = new BD_Helper();


export default class EventCategoryRepository {
    getAllAsync = async () => {
        const sql = 'SELECT * FROM event_categories'
        let array = await PQ.Query(sql);
        return array.rows;
    }

    getCategoryById = async (id) => {
        const sql = 'SELECT * FROM event_categories WHERE id=$1'
        const values = [id];
        let array = await PQ.Query(sql, values);
        return array.rows;
    }

    insertCategory = async (cat) => {
        const sql = 'INSERT INTO public.event_categories (name, display_order) VALUES ($1, $2)';
        const values = [cat.name, cat.display_order]
        const result = await PQ.Query(sql, values)
        if(result.rowCount != 0){
            return true
        }
        else{
            return false
        }
    }

    updateEventCategory = async (cat) => {
        const sql = 'UPDATE public.event_categories SET "name" = $1, "display_order" = $2 WHERE id = $3'
        const values = [cat.name, cat.display_order, cat.id]
        const result = await PQ.Query(sql, values)
        if(result.rowCount != 0){
            return true
        }
        else{
            return false
        }
    }

    deleteEventCategory = async (id) => {
        const sql = 'DELETE FROM event_categories where id = $1';
        const values = [id];
        const result = await PQ.Query(sql, values);
        if(result.rowCount != 0){
            return true;
        }
        else{
            return false
        }
    }
}