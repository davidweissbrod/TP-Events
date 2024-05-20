class EventLocation{
    id_event_location;
    id_location;
    name;
    full_adress;
    max_capacity;
    latitude;
    longitude;
    id_creator_user;

    EventLocation(id, id_loc, name, full_adress, max_capacity, lat, long, id_us){
        this.id_event_location = id;
        this.id_location = id_loc;
        this.name = name;
        this.full_adress = full_adress;
        this.max_capacity = max_capacity;
        this.latitude = lat;
        this.longitude = long;
        this.id_creator_user = id_us;
    }
}

export default EventLocation;