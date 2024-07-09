import EventsEnrollmentRepository from '../repositories/event_enrollment_repository.js';


export default class EventsEnrollmentService{

    getUsersEnrolls = async(id, first_name, last_name, username, attended, rating) => {
        const repo = new EventsEnrollmentRepository();
        let sql = `
            SELECT users.id, users.first_name, users.last_name, users.username
            FROM users
            JOIN event_enrollments ON users.id = event_enrollments.id_user
            WHERE event_enrollments.id_event = $1
        `
        const params = [id];

        if (first_name) {
            sql += ` AND users.first_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(first_name);
        }
        if (last_name) {
            sql += ` AND users.last_name ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(last_name);
        }
        if (username) {
            sql += ` AND users.username ILIKE '%' || $${params.length + 1} || '%'`;
            params.push(username);
        }
        if (attended !== undefined) {
            sql += ` AND event_enrollment.attended = $${params.length + 1}`;
            params.push(attended);
        }
        if (rating !== undefined) {
            sql += ` AND event_enrollment.rating > $${params.length + 1}`;
            params.push(rating);
        }
        const array = repo.getUsersEnrolls(sql, params);
        return array;
    }
}