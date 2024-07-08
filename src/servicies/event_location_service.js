import EventLocationRepository from '../repositories/event_location_repository.js'
import ReturnObject from '../entities/return_object.js'
import validaciones from '../helpers/validaciones-helper.js'

export default class EventLocationService {
    getUserLocations = async (id) => {
        const repo = new EventLocationRepository();
        let obj = new ReturnObject();

        const response = await repo.getUserLocations(id)

        obj.status = true;
        obj.code = 200;
        obj.JSONcontent = response.rows;
        obj.message = "Se obtuvieron con exito"

        return returnObject;
    }

    getUserLocationById = async (id_creator_user, id_location) => {
        const repo = new EventLocationRepository();
        let obj = new ReturnObject();

        const response = await repo.getUserLocationById(id_creator_user, id_location)

        if (response.rowCount != 0){
            obj.status = true;
            obj.code = 200;
            obj.JSONcontent = response.rows;
            obj.message = "Se obtuvo correctamente"
        }
        else{
            obj.status = false;
            obj.code = 404;
            obj.message = 'Esa ubicacion no existe'
        }

        return obj;
    }
    createUserLocation = async (event_location) => {
        const repo = new EventLocationRepository();
        let obj = new ReturnObject();

        if (!validaciones.getValidatedString(event_location.name) || !validaciones.getValidatedString(event_location.full_address)){
            obj = ReturnObject.ErrorObject('Nombre o direccion invalidas'); 
            return obj; 
        }
        if(event_location.max_capacity <= 0){
            obj = ReturnObject.ErrorObject('Capacidad invalida');
            return obj;
        }
        const response = await repo.createUserLocation(event_location);
        if(response.rowCount > 0){
            obj.status = true;
            obj.code = 200;
            obj.message = "Creado con exito";
        }
        else{
            obj = ReturnObject.negarObjeto('No se pudo crear');
        }   

        return obj;
    }
    deleteUserLocation = async (id, id_creator_user) => {
        const repo = new EventLocationRepository();
        let obj = new ReturnObject();
        const response = await repo.deleteEventLocation(id, id_creator_user)
        if(response.rowCount > 0){
            obj.status = true;
            obj.code = 200;
            obj.message = "Eliminado";         
        }
        else{
            obj = ReturnObject.ErrorObject('No se pudo eliminar');
        }
        return obj;
    }
}
