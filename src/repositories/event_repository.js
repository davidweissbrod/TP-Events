import BD_Helper from "../helpers/sql-helper.js";
const help = new BD_Helper();

export default class EventRepository {

    // Método para obtener eventos según los filtros SQL proporcionados
    async getAsync(sql) {
        const query = `SELECT * FROM events ${sql}`;
        const result = await help.Query(query);
        return result.rows;  // Retorna las filas del resultado
    }

    // Obtener todos los eventos con paginación
    async getAllAsync(page = 1) {
        const sql = `
            WITH event_details AS (
                SELECT
                    events.id,
                    events.name,
                    events.description,
                    events.id_event_category, 
                    events.id_event_location,
                    events.start_date, 
                    events.duration_in_minutes, 
                    events.price, 
                    events.enabled_for_enrollment, 
                    events.max_assistance, 
                    events.id_creator_user,
                    json_build_object(
                        'id', event_locations.id,
                        'id_location', event_locations.id_location,
                        'name', event_locations.name,
                        'full_address', event_locations.full_address,
                        'max_capacity', event_locations.max_capacity,
                        'latitude', event_locations.latitude,
                        'longitude', event_locations.longitude,
                        'id_creator_user', event_locations.id_creator_user,
                        'location', json_build_object(
                            'id', locations.id,
                            'name', locations.name,
                            'id_province', locations.id_province,
                            'latitude', locations.latitude,
                            'longitude', locations.longitude,
                            'province', json_build_object(
                                'id', provinces.id,
                                'name', provinces.name,
                                'full_name', provinces.full_name,
                                'latitude', provinces.latitude,
                                'longitude', provinces.longitude,
                                'display_order', provinces.display_order
                            )
                        )
                    ) AS event_location,
                    json_build_object(
                        'id', users.id,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'username', users.username,
                        'password', users.password
                    ) AS creator_user,
                    (
                        SELECT json_agg(json_build_object(tags.id, tags.name))
                        FROM tags
                        JOIN event_tags ON tags.id = event_tags.id_tag
                        WHERE event_tags.id_event = events.id
                    ) AS tags,
                    json_build_object(
                        'id', event_categories.id,
                        'name', event_categories.name,
                        'display_order', event_categories.display_order
                    ) AS event_category
                FROM events
                LEFT JOIN event_categories ON events.id_event_category = event_categories.id
                LEFT JOIN event_tags ON events.id = event_tags.id_event
                LEFT JOIN users ON events.id_creator_user = users.id
                LEFT JOIN event_locations ON events.id_event_location = event_locations.id
                LEFT JOIN locations ON event_locations.id_location = locations.id
                LEFT JOIN provinces ON locations.id_province = provinces.id
                OFFSET $1
                LIMIT 10  -- Cambié el límite a 10 por conveniencia
            ),
            total_event_count AS (
                SELECT count(*) AS total_count
                FROM events
            )
            SELECT
                (SELECT json_agg(row_to_json(event_details)) FROM event_details) AS events,
                (SELECT row_to_json(total_event_count) FROM total_event_count) AS total_count;
        `;

        const values = [(page - 1) * 10];  // La paginación debe comenzar desde 0
        const result = await help.Query(sql, values);
        return result.rows[0];  // Devuelve los eventos y el total de eventos
    }

    // Obtener un evento por su ID
    async getEventById(id) {
        const sql = `
            SELECT 
                events.id,
                events.name,
                events.description,
                events.id_event_category, 
                events.id_event_location,
                events.start_date, 
                events.duration_in_minutes, 
                events.price, 
                events.enabled_for_enrollment, 
                events.max_assistance, 
                events.id_creator_user,
                json_build_object(
                    'id', event_locations.id,
                    'id_location', event_locations.id_location,
                    'name', event_locations.name,
                    'full_address', event_locations.full_address,
                    'max_capacity', event_locations.max_capacity,
                    'latitude', event_locations.latitude,
                    'longitude', event_locations.longitude,
                    'id_creator_user', event_locations.id_creator_user,
                    'location', json_build_object(
                        'id', locations.id,
                        'name', locations.name,
                        'id_province', locations.id_province,
                        'latitude', locations.latitude,
                        'longitude', locations.longitude,
                        'province', json_build_object(
                            'id', provinces.id,
                            'name', provinces.name,
                            'full_name', provinces.full_name,
                            'latitude', provinces.latitude,
                            'longitude', provinces.longitude,
                            'display_order', provinces.display_order
                        )
                    )
                ) AS event_location,
                json_build_object(
                    'id', users.id,
                    'first_name', users.first_name,
                    'last_name', users.last_name,
                    'username', users.username,
                    'password', users.password
                ) AS creator_user,
                (
                    SELECT json_agg(json_build_object(tags.id, tags.name))
                    FROM tags
                    JOIN event_tags ON tags.id = event_tags.id_tag
                    WHERE event_tags.id_event = events.id
                ) AS tags,
                json_build_object(
                    'id', event_categories.id,
                    'name', event_categories.name,
                    'display_order', event_categories.display_order
                ) AS event_category
            FROM events
            LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            LEFT JOIN event_tags ON events.id = event_tags.id_event
            LEFT JOIN users ON events.id_creator_user = users.id
            LEFT JOIN event_locations ON events.id_event_location = event_locations.id
            LEFT JOIN locations ON event_locations.id_location = locations.id
            LEFT JOIN provinces ON locations.id_province = provinces.id
            WHERE events.id = $1;
        `;
        const values = [id];
        const result = await help.Query(sql, values);
        return result.rows[0];  // Devuelve el evento con todos los detalles
    }

    // Insertar un nuevo evento en la base de datos
    async insertEvent(event) {
        const sql = `
            INSERT INTO public.events 
            (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
        `;
        const values = [event.name, event.description, event.id_event_category, event.id_event_location, event.start_date, event.duration_in_minutes, event.price, event.enabled_for_enrollment, event.max_assistance, event.id_creator_user];
        const result = await help.Query(sql, values);
        return result.rows[0] ? result.rows[0].id : null;  // Retorna el ID del nuevo evento insertado
    }

    // Actualizar un evento en la base de datos
    async updateEvent(event) {
        const sql = `
            UPDATE public.events
            SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, 
                duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9
            WHERE id = $10;
        `;
        const values = [event.name, event.description, event.id_event_category, event.id_event_location, event.start_date, event.duration_in_minutes, event.price, event.enabled_for_enrollment, event.max_assistance, event.id];
        const result = await help.Query(sql, values);
        return result.rowCount > 0;  // Devuelve true si se actualizó correctamente
    }

    // Eliminar un evento por su ID
    async deleteEventById(id) {
        const sql = 'DELETE FROM events WHERE id = $1';
        const values = [id];
        const result = await help.Query(sql, values);
        return result.rowCount > 0;  // Devuelve true si el evento fue eliminado
    }
}
