import EventRepository from '../repositories/category_repository.js'

export default class EventService {
    getAllAsync = async () => {
        const repo = new EventRepository();
        return await repo.getAllAsync();
    }
    getEventByName = async () => {
        const repo = new EventRepository();
        return await repo.getEventByName(eventName);
    }
    getEventByCategory = async () => {
        const repo = EventRepository();
        return await repo.getEventByCategory(category);
    }
    getEventByDate = async () => {
        const repo = EventRepository();
        return await repo.getEventByDate(date)
    }
    getEventByTag = async () => {
        const repo = EventRepository();
        return await repo.getEventByTag(tag)
    }
    getEventById = async () => {
        const repo = EventRepository();
        return await repo.getEventById(id)
    }
    getEventByFirstName = async () => {
        const repo = EventRepository();
        return await repo.getEventByFirstName(first_name)
    }
    getEventByLastName = async () => {
        const repo = EventRepository();
        return await repo.getEventByLastName(last_name)
    }
    getEventByUsername = async () => {
        const repo = EventRepository();
        return await repo.getEventByUsername(username)
    }
    getEventByAttendance = async () => {
        const repo = EventRepository();
        return await repo.getEventByAttendance(attended)
    }
    getEventByRating = async () => {
        const repo = EventRepository();
        return await repo.getEventByRating(rating)
    }
}