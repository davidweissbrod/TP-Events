import EventLocationRepository from '../repositories/event_location_repository.js'

export default class EventLocationService {
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        return await repo.getAllAsync();
    }

    getEventLocationById = async (id) => {
        const repo = new EventLocationRepository();
        return await repo.getEventLocationById(id);
    }

    insertEventLocation = async (evLoc) => {
        const repo = new EventLocationRepository();
        return await repo.insertEventLocation(evLoc);
    }

    updateEventLocation = async (evLoc) => {
        const repo = new EventLocationRepository();
        return await repo.updateEventLocation(evLoc);
    }

    deleteEventLocation = async (id) => {
        const repo = new EventLocationRepository();
        return await repo.deleteEventLocation(id)
    }
}