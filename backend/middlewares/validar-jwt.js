import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'does not exist token in the request'
        });
    }else{
        try {
            const { uid,name } = jwt.verify(token, process.env.SECRET_KEY);
            req.uid = uid;
            req.name = name;
            
            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token is not valid'
            });
        }
    }
}