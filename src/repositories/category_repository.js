import BD_Helper from "../helpers/sql-helper.js";

const PQ = new BD_Helper();

export default class EventCategoryRepository {

    // Obtener todas las categorías de eventos
    getAllAsync = async () => {
        try {
            const sql = 'SELECT * FROM event_categories';
            const result = await PQ.Query(sql);
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching event categories');  // Captura errores al obtener todas las categorías
        }
    };

    // Obtener una categoría de evento por su ID
    getCategoryById = async (id) => {
        try {
            const sql = 'SELECT * FROM event_categories WHERE id=$1';
            const values = [id];
            const result = await PQ.Query(sql, values);
            return result.rows[0] || null;  // Si no encuentra la categoría, retorna null
        } catch (error) {
            throw new Error('Error fetching event category by ID');  // Captura errores al obtener la categoría por ID
        }
    };

    // Insertar una nueva categoría de evento
    insertCategory = async (cat) => {
        try {
            const sql = 'INSERT INTO public.event_categories (name, display_order) VALUES ($1, $2)';
            const values = [cat.name, cat.display_order];
            const result = await PQ.Query(sql, values);
            return result.rowCount > 0;  // Retorna true si la categoría se insertó correctamente
        } catch (error) {
            throw new Error('Error inserting new event category');  // Captura errores al insertar la categoría
        }
    };

    // Actualizar una categoría de evento
    updateEventCategory = async (cat) => {
        try {
            const sql = 'UPDATE public.event_categories SET name = $1, display_order = $2 WHERE id = $3';
            const values = [cat.name, cat.display_order, cat.id];
            const result = await PQ.Query(sql, values);
            return result.rowCount > 0;  // Retorna true si la categoría se actualizó correctamente
        } catch (error) {
            throw new Error('Error updating event category');  // Captura errores al actualizar la categoría
        }
    };

    // Eliminar una categoría de evento por su ID
    deleteEventCategory = async (id) => {
        try {
            const sql = 'DELETE FROM event_categories WHERE id = $1';
            const values = [id];
            const result = await PQ.Query(sql, values);
            return result.rowCount > 0;  // Retorna true si la categoría fue eliminada correctamente
        } catch (error) {
            throw new Error('Error deleting event category');  // Captura errores al eliminar la categoría
        }
    };
}
