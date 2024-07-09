import LocationRepository from '../repositories/location_repository.js';

export default class LocationService{
    getLocations = async (page) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        const res = await repo.getLocations(page);
        if(res.rowCount != 0){
            obj.status = true;
            obj.message = "Se obtuvieron con exito"
        } else{
            obj.status = false;
            obj.message = "Error al obtener las ubicaciones"
        }
        return obj;
    }
    getLocationById = async (id) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        const res = await repo.getLocationById(id);
        if(res.rowCount != 0){
            obj.status = true;
            obj.message = "Se obtuvo la ubicacion con exito"
        } else {
            obj.status = false
            obj.message = "No se pudo obtener la ubicacion"
        }
        return obj;
    }
    getEventLocationByLocationId = async (id_location, id_creator_user) => {
        const repo = new LocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        const res = await repo.getEventLocationByLocationId(id_location, id_creator_user);
        if(res.rowCount != 0){
            obj.status = true,
            obj.message = "Se obtuvo con exito"
        } else{
            obj.status = false
            obj.message = "No se pudo obtener la ubicacion"
        }
        return obj;
    }
}
