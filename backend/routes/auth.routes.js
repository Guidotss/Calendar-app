import { Router } from 'express';
import { register,renew,login } from '../controllers/auth.js';
import { check } from 'express-validator'; 
import { validarJWT } from '../middlewares/validar-jwt.js'
import { validateErrors } from '../middlewares/validate-errors.js'

const router = Router();

router.post(
    '/register',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        check('password','Password must be at least 6 characters').isLength({ min: 6 }),
        validateErrors
    ],
    register
);
router.post('/login',
    [
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        check('password','Password must be at least 6 characters').isLength({ min: 6 }),
        validateErrors
    ],
    login
); 
router.post('/renew',validarJWT,renew); 

export default router;