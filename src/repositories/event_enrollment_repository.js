import BD_Helper from "../helpers/sql-helper.js";
const help = new BD_Helper();

export default class EventsEnrollmentRepository {
    // Obtiene los usuarios inscritos en un evento según una consulta SQL personalizada
    getUsersEnrolls = async (sql, values) => {
        try {
            const result = await help.Query(sql, values);
            if (result && result.rows) {
                return result.rows;
            }
            return null; // Si no hay resultados, retorna null
        } catch (error) {
            console.error('Error al obtener usuarios inscritos:', error);
            throw new Error('Error al ejecutar la consulta');
        }
    };

    // Inscribe a un usuario en un evento
    enrollUser = async (idEvent, idUser, todayDate) => {
        const sql = `INSERT INTO event_enrollments (id_event, id_user, registration_date_time, attended)
                     VALUES ($1, $2, $3, B'0')`;  // B'0' indica que el usuario no ha asistido aún
        const values = [idEvent, idUser, todayDate];

        try {
            const result = await help.Query(sql, values);
            return result;  // Devuelve el resultado de la consulta (insertado exitoso o error)
        } catch (error) {
            console.error('Error al inscribir al usuario en el evento:', error);
            throw new Error('Error al inscribir al usuario');
        }
    };

    // Elimina la inscripción de un usuario en un evento
    deleteUserEnroll = async (idEvent, idUser) => {
        const sql = `DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2`;
        const values = [idEvent, idUser];

        try {
            const result = await help.Query(sql, values);
            return result;  // Devuelve el resultado de la operación de eliminación
        } catch (error) {
            console.error('Error al eliminar la inscripción del usuario:', error);
            throw new Error('Error al eliminar inscripción');
        }
    };

    // Actualiza la calificación y las observaciones de un usuario en un evento
    updateRating = async (rating, observation, idEv, idUs) => {
        const sql = `UPDATE event_enrollments 
                     SET rating = $1, observations = $2 
                     WHERE id_event = $3 AND id_user = $4`;
        const values = [rating, observation, idEv, idUs];

        try {
            const result = await help.Query(sql, values);
            return result;  // Devuelve el resultado de la actualización (exitoso o error)
        } catch (error) {
            console.error('Error al actualizar el rating del usuario:', error);
            throw new Error('Error al actualizar rating');
        }
    };
}
