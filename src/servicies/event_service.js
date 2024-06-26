import EventRepository from '../repositories/category_repository.js'
import VH from '../helpers/validaciones-helper.js'

export default class EventService {
    getAsync = async(name, category, startdate, tag) => {
        const repo = new EventRepository();
        let sql = 'WHERE ';
        if(name != null){
            sql += `name = '${name}' AND `;
        }
        if(category != null){
            sql += `id_event_category = ${category} AND `;
        }
        if(startdate != null){
            sql += `start_date = '${startdate}' AND `;
        }
        if(tag != null){
            sql += `tag = '${tag}' AND `;
        }
        return await repo.getAsync(sql);
    }
    getAllAsync = async(page = 1) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync(page);
        return returnArray;

    }
    getEventById = async(id) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getById(id);
        return returnArray;
    }
    createEvent = async(event) => {
        const repo = new EventRepository();
        if(VH.getValidatedString(event.name) || VH.getValidatedString(event.description)){
        
        }
        return await repo.createEvent(event);
    }
}