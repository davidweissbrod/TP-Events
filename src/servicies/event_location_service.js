import EventLocationRepository from '../repositories/event_location_repository.js'
import validaciones from '../helpers/validaciones-helper.js'

export default class EventLocationService {
    getEventLocations = async (id) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        };
        const res = await repo.getEventLocations(id)
        if(res.rowCount != 0){
            obj.status = true;
            obj.message = "Se obtuvieron las ubicaciones"
        } else{
            obj.status = false;
            obj.message = "Error al obtener las ubicaciones"
        }
        return obj;
    }

    getEventLocationById = async (id_creator_user, id_location) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        const res = await repo.getEventLocationById(id_creator_user, id_location)
        if (res.rowCount != 0){
            obj.status = true;
            obj.message = "Se obtuvo correctamente"
        }
        else{
            obj.status = false;
            obj.message = 'No se encontro esa ubicacion'
        }
        return obj;
    }
    insertEventLocation = async (event_location) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        if (!validaciones.getValidatedString(event_location.name) || !validaciones.getValidatedString(event_location.full_address)){
            obj.status = false
            obj.message = "Nombre o direccion invalidas" 
        }
        if(event_location.max_capacity <= 0){
            obj.status = false
            obj.message = "Capacidad invalida"
        }
        const response = await repo.insertEventLocation(event_location);
        if(response.rowCount > 0){
            obj.status = true;
            obj.message = "Creado con exito";
        }
        else{
            obj.status = false
            obj.message = "No se pudo crear"
        }   
        return obj;
    }
    deleteEventLocation = async (id, id_creator_user) => {
        const repo = new EventLocationRepository();
        let obj = {
            status: false,
            message: ""
        }
        const response = await repo.deleteEventLocation(id, id_creator_user)
        if(response.rowCount != 0){
            obj.status = true;
            obj.message = "Eliminado correctamente";         
        }
        else{
            obj.status = false;
            obj.message = "No se pudo eliminar";
        }
        return obj;
    }
}
