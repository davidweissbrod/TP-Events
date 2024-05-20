class Locations{
    id_location;
    name;
    id_province;
    latitude;
    longitude;

    Locations(id, name, id_prov, lat, long){
        this.id_location = id;
        this.name = name;
        this.id_province = id_prov;
        this.latitude = lat;
        this.longitude = long;
    }
}

export default Locations;