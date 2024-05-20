class EventEnrollments{
    id_event_enrollment;
    id_event;
    id_user;
    description;
    registration_date_time;
    attended;
    observations;
    rating;

    EventEnrollments(id, id_ev, id_us, desc, reg_date_time, att, observations, rating){
        this.id_event_enrollment = id;
        this.id_event = id_ev;
        this.id_user = id_us;
        this.description = desc;
        this.registration_date_time = reg_date_time;
        this.attended = att;
        this.observations = observations;
        this.rating = rating;
    }
}

export default EventEnrollments;