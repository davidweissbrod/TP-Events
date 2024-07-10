import BD_Helper from "../helpers/sql-helper.js"
const help = new BD_Helper();

export default class EventsEnrrollmentRepository{
    getUsersEnrolls = async(sql, values) => {
        let array = await help.Query(sql, values);
        if (array){
            return array.rows;      
        }
        else{
            return null;
        } 
    }   

    enrollUser = async (idEvent, idUser, todayDate) => {
        const sql = `INSERT INTO event_enrollments (id_event, id_user, registration_date_time, attended)
        VALUES ($1, $2, $3, B'0');`;
        const values = [idEvent, idUser, todayDate];
        let array = await help.Query(sql, values);
        return array;
    }
    deleteUserEnroll = async (idEvent, idUser) => {
        const sql = `DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2`;
        const values = [idEvent, idUser];
        let array = await help.Query(sql, values);
        return array;
    }
    updateRating = async(rating, observation, idEv, idUs) => {
        const sql = `UPDATE event_enrollments SET rating = $1, observations = $2 WHERE id_event = $3 AND id_user = $4`;
        const values = [rating, observation, idEv, idUs];
        let array = await help.Query(sql, values);
        return array;
    }
}