import EventCategoryRepository from '../repositories/province_repository.js'

export default class EventCategoryService {
    getAllAsync = async () => {
        const repo = new EventCategoryRepository();
        return await repo.getAllAsync();
    }

    getCategoryById = async () => {
        const repo = new EventCategoryRepository();
        return await repo.getCategoryById();
    }

    insertCategory = async () => {
        const repo = new EventCategoryRepository();
        return await repo.insertCategory();
    }

    updateEventCategory = async () => {
        const repo = new EventCategoryRepository();
        return await repo.updateEventCategory();
    }

    deleteEventCategory = async () => {
        const repo = new EventCategoryRepository();
        return await repo.deleteEventCategory();
    }
}