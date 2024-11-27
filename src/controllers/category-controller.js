import { Router } from 'express';
import EventCategoryService from '../services/category_service.js';
import EventCategory from '../entities/event_categories.js';

const router = Router();
const svc = new EventCategoryService();

// Obtener todas las categorías de eventos
router.get('/event-category', async (req, res) => {
    try {
        const categories = await svc.getAllAsync();
        if (categories && categories.length > 0) {
            return res.status(200).json(categories);  // Devuelve las categorías con estado 200
        } else {
            return res.status(404).send('No categories found');  // Si no hay categorías
        }
    } catch (error) {
        return res.status(500).send('Error fetching categories');  // Error del servidor
    }
});

// Obtener una categoría de evento por su id
router.get('/event-category/:id', async (req, res) => {
    try {
        const category = await svc.getCategoryById(req.params.id);
        if (category) {
            return res.status(200).json(category);  // Devuelve la categoría con estado 200
        } else {
            return res.status(404).send('Category not found');  // Si no se encuentra la categoría
        }
    } catch (error) {
        return res.status(500).send('Error fetching category');  // Error del servidor
    }
});

// Crear una nueva categoría de evento
router.post('/event-category', async (req, res) => {
    try {
        const newCategory = new EventCategory(req.body.name, req.body.display_order);
        const created = await svc.insertCategory(newCategory);
        if (created) {
            return res.status(201).send('Category created');  // Respuesta de éxito (201)
        } else {
            return res.status(400).send('Error creating category');  // Error en la creación
        }
    } catch (error) {
        return res.status(500).send('Error creating category');  // Error del servidor
    }
});

// Actualizar una categoría de evento
router.put('/event-category', async (req, res) => {
    try {
        const updatedCategory = new EventCategory(req.body.name, req.body.display_order);
        const updated = await svc.updateEventCategory(updatedCategory);
        if (updated) {
            return res.status(200).send('Category updated');  // Respuesta de éxito
        } else {
            return res.status(404).send('Category not found');  // Si no se encuentra la categoría
        }
    } catch (error) {
        return res.status(500).send('Error updating category');  // Error del servidor
    }
});

// Eliminar una categoría de evento por id
router.delete('/event-category/:id', async (req, res) => {
    try {
        const deleted = await svc.deleteEventCategory(req.params.id);
        if (deleted) {
            return res.status(200).send('Category deleted');  // Respuesta de éxito
        } else {
            return res.status(404).send('Category not found');  // Si no se encuentra la categoría
        }
    } catch (error) {
        return res.status(500).send('Error deleting category');  // Error del servidor
    }
});

export default router;
