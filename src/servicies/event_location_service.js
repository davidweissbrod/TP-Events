import EventLocationRepository from '../repositories/event_location_repository.js'

export default class EventLocationService {
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        return await repo.getAllAsync();
    }

}