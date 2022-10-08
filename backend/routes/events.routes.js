import { Router } from 'express'; 
import { check } from 'express-validator';
import { getAllEvents,createEvent,updateEvent,deleteEvent } from '../controllers/events.js'
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validateErrors } from '../middlewares/validate-errors.js';

const router = Router();

router.get('/',validarJWT,getAllEvents);

router.post(
    '/',
    [
        check('title','Title is required').not().isEmpty(),
        check('title','Title must be at least 3 characters').isLength({ min: 3 }),
        check('note','Note is required').not().isEmpty(),
        check('note','Note must be at least 3 characters').isLength({ min: 3 }),
    ],
    validateErrors,
    validarJWT,
    createEvent
); 

router.put(
    '/:id',
    [
        check('title','title mus be at least 3 characters').isLength({ min: 3 }),
        check('note','note mus be at least 3 characters').isLength({ min: 3 }),
    ],
    validateErrors,
    validarJWT,
    updateEvent
);

router.delete('/:id',validarJWT,deleteEvent);


export default router;