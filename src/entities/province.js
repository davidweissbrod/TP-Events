class Province{
    id;
    name; 
    full_name; 
    latitude;
    longitude;
    display_order;

    Province(id, name, full_name, lat, long, dis_or){
        this.id = id;
        this.name = name;
        this.full_name = full_name;
        this.latitude = lat;
        this.longitude = long;
        this.display_order = dis_or;
    }
}

export default Province;
