import EventCategoryRepository from '../repositories/category_repository.js'

export default class EventCategoryService {
    getAllAsync = async () => {
        const repo = new EventCategoryRepository();
        return await repo.getAllAsync();
    }

    getCategoryById = async (id) => {
        const repo = new EventCategoryRepository();
        return await repo.getCategoryById(id);
    }

    insertCategory = async (cat) => {
        const repo = new EventCategoryRepository();
        return await repo.insertCategory(cat);
    }

    updateEventCategory = async (eventCategory) => {
        const repo = new EventCategoryRepository();
        return await repo.updateEventCategory(eventCategory);
    }

    deleteEventCategory = async (id) => {
        const repo = new EventCategoryRepository();
        return await repo.deleteEventCategory(id);
    }
}