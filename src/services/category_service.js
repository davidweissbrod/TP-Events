import EventCategoryRepository from '../repositories/category_repository.js';
import Helper from '../helpers/validaciones-helper.js';

const validate = new Helper();

export default class EventCategoryService {
    // Obtener todas las categorías de eventos
    getAllAsync = async () => {
        try {
            const repo = new EventCategoryRepository();
            return await repo.getAllAsync();
        } catch (error) {
            throw new Error('Error fetching categories');  // Si algo falla al obtener todas las categorías
        }
    };

    // Obtener una categoría por su ID
    getCategoryById = async (id) => {
        try {
            const repo = new EventCategoryRepository();
            const category = await repo.getCategoryById(id);
            return category;  // Retorna la categoría si la encuentra
        } catch (error) {
            throw new Error('Error fetching category by ID');  // Error al buscar una categoría por ID
        }
    };

    // Crear una nueva categoría de evento
    insertCategory = async (cat) => {
        try {
            const repo = new EventCategoryRepository();
            const created = await repo.insertCategory(cat);
            return created;  // Devuelve true o false según la inserción
        } catch (error) {
            throw new Error('Error creating category');  // Error al crear la categoría
        }
    };

    // Actualizar una categoría de evento
    updateEventCategory = async (eventCategory) => {
        try {
            if (!validate.getValidatedString(eventCategory.name)) {
                // Verifica si el nombre de la categoría no es válido
                return { status: false, message: 'Invalid category name' };
            }

            const repo = new EventCategoryRepository();
            const updated = await repo.updateEventCategory(eventCategory);
            if (updated) {
                return { status: true, message: 'Category updated successfully' };
            } else {
                return { status: false, message: 'Category not found' };
            }
        } catch (error) {
            return { status: false, message: 'Error updating category' };  // Error al actualizar la categoría
        }
    };

    // Eliminar una categoría de evento
    deleteEventCategory = async (id) => {
        try {
            const repo = new EventCategoryRepository();
            const deleted = await repo.deleteEventCategory(id);
            if (deleted) {
                return { status: true, message: 'Category deleted successfully' };
            } else {
                return { status: false, message: 'Category not found' };
            }
        } catch (error) {
            return { status: false, message: 'Error deleting category' };  // Error al eliminar la categoría
        }
    };
}
