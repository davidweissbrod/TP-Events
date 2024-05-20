class Events{
    id_event; 
    name;
    descripction;
    id_event_category;
    id_event_location;
    start_date;
    duration_in_minutes;
    price;
    enabled_for_enrollment;
    max_assitance;
    id_creator_user;

    Events(id, name, descripction, id_ev_cat, id_ev_loc, start_date, duration_mins, price, enabled, max_assitance, id_creator_user){
        this.id_event = id;
        this.name = name;
        this.descripction = descripction;
        this.id_event_category = id_ev_cat;
        this.id_event_location = id_ev_loc;
        this.start_date = start_date;
        this.duration_in_minutes = duration_mins;
        this.price = price;
        this.enabled_for_enrollment = enabled;
        this.max_assitance = max_assitance;
        this.id_creator_user = id_creator_user;
    }
}

export default Events;