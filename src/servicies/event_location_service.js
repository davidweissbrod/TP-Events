import EventLocationRepository from '../repositories/event_location_repository.js'
import AuthService from '../middlewares/auth_middleware.js'

export default class EventLocationService {
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        return await repo.getAllAsync();
    }

    getEventLocationById = async (id_creator_user) => {
        let objeto = {
            success: false,
            message: "",
            token: ""
        }     
        const repo = new EventLocationRepository()
        const auth = new AuthService()
        let user = await repo.getUserById(id_creator_user)
        if(user != null){
            objeto.success = true;
            objeto.message = "Correcto";
            objeto.token = await auth.login(user);
        } else{
            objeto.message = "No se encontro el usuario";
        }
        return await repo.getEventLocationById(id_creator_user);
    }

    insertEventLocation = async (evLoc) => {
        let objeto = {
            success: false,
            message: "",
            token: ""
        }
        const repo = new EventLocationRepository();
        const auth = new AuthService();
        let user = await repo.getUserById(evLoc.id_creator_user)
        if(user != null){
            objeto.success = true;
            objeto.message = "Correcto";
            objeto.token = await auth.generateToken(objeto);
        } else{
            objeto.message = "No se encontro el usuario";
        }     
        return await repo.insertEventLocation(evLoc);
    }

    updateEventLocation = async (evLoc) => {
        let objeto = {
            success: false,
            message: "",
            token: ""
        }
        const repo = new EventLocationRepository();
        const auth = new AuthService();
        let user = await repo.getUserById(evLoc.id_creator_user)
        if(user != null){
            objeto.success = true
            objeto.message = "Correcto"
            objeto.token = await auth.generateToken(objeto);
        }
        return await repo.updateEventLocation(evLoc);
    }

    deleteEventLocation = async (id_creator_user) => {
        let objeto = {
            success: false,
            message: "",
            token: ""
        }     
        const repo = new EventLocationRepository()
        const auth = new AuthService()
        let user = await repo.getUserById(id_creator_user)
        if(user != null){
            objeto.success = true;
            objeto.message = "Correcto";
            objeto.token = await auth.login(user);
        } else{
            objeto.message = "No se encontro el usuario";
        }
        return await repo.deleteEventLocation(id_creator_user)
    }
}