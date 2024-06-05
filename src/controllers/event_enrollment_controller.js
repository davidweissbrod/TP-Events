import {Router} from 'express';
import EventService from 'src/services/event_service.js'
import ValidacionesHelper from './helpers/validaciones-helper'
import AuthMiddleware from './middlewares/auth_middleware.js'
import AuthService from './services/auth_service.js'
import EventEnrollment from '../entities/event_enrollments.js';
const router = Router();
const svc = new EventService();

router.post('/api/event/{id}/enrollment/', async (req, res) => {
    let ret;
    ret = await insertUserInEvent(new EventEnrollment())
})
