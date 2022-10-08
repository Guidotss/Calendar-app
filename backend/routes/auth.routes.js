import { Router } from 'express';
import { register,renew,login } from '../controllers/auth.js';
import { check } from 'express-validator'; 
import { validarJWT } from '../middlewares/validar-jwt.js'

const router = Router();

router.post(
    '/register',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        check('password','Password must be at least 6 characters').isLength({ min: 6 })
    ],
    register
);
router.post('/login',
    [
        check('email','Email is required').isEmail(),
        check('password','Password is required').not().isEmpty(),
        check('password','Password must be at least 6 characters').isLength({ min: 6 })
    ],
    login
); 
router.post('/renew',validarJWT,renew); 

export default router;