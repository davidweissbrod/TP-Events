import EventRepository from '../repositories/category_repository.js'

export default class EventService {
    getAllAsync = async () => {
        const repo = new EventRepository();
        return await repo.getAllAsync();
    }
    getEventByName = async (eventName) => {
        const repo = new EventRepository();
        return await repo.getEventByName(eventName);
    }
    getEventByCategory = async (category) => {
        const repo = EventRepository();
        return await repo.getEventByCategory(category);
    }
    getEventByDate = async (date) => {
        const repo = EventRepository();
        return await repo.getEventByDate(date)
    }
    getEventByTag = async (tag) => {
        const repo = EventRepository();
        return await repo.getEventByTag(tag)
    }
    getEventById = async (id) => {
        const repo = EventRepository();
        return await repo.getEventById(id)
    }
    getEventByFirstName = async (first_name) => {
        const repo = EventRepository();
        return await repo.getEventByFirstName(first_name)
    }
    getEventByLastName = async (last_name) => {
        const repo = EventRepository();
        return await repo.getEventByLastName(last_name)
    }
    getEventByUsername = async (username) => {
        const repo = EventRepository();
        return await repo.getEventByUsername(username)
    }
    getEventByAttendance = async (attended) => {
        const repo = EventRepository();
        return await repo.getEventByAttendance(attended)
    }
    getEventByRating = async (rating) => {
        const repo = EventRepository();
        return await repo.getEventByRating(rating)
    }
    insertEvent = async (ev) => {
        const repo = EventRepository();
        return await repo.insertEvent(ev)
    }
    updateEvent = async (ev) => {
        const repo = EventRepository();
        return await repo.updateEvent(ev)
    }
    deleteEventById = async (id) => {
        const repo = EventRepository();
        return await repo.deleteEventById(id)
    }
}