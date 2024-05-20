class EventCategories{
    id_event_categories;
    name; 
    display_order;

    EventCategories(id, name, display_order){
        this.id_event_categories = id;
        this.name = name;
        this.display_order = display_order;
    }
}

export default EventCategories;