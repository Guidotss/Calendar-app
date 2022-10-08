import { User } from '../services/User.js'; 
import { validateErrors } from '../middlewares/validate-errors.js'
import { generarJWT } from '../helpers/jwt.js'; 

const user = new User();

export const register = async (req, res) => {
    const { email,name, password }  = req.body;

    try {
        const newUser = await user.createUser(name,email,password); 
        if(!newUser){

            return res.status(400).json({
                ok:false,
                msg:'User already exists'
            });

        }else{

            const token = await generarJWT(newUser.id,newUser.name);
            return res.status(201).json({
                ok: true,
                msg: 'register',
                name,
                email,
                token
            }); 
        }


    }catch(err){

        console.log(err);
        return res.status(500).json({
            ok:false,
            msg: 'Unexpected error'
        });

    }
};
export const login = async (req, res) => {

    const { email, password }  = req.body;

    
    try{
        const userDB = await user.loginUser(email,password);
        if(!userDB){

            return res.status(400).json({
                ok:false,
                msg:'Invalid credentials'
            });

        }else{

            const token = await generarJWT(userDB.id,userDB.name);
            return res.status(200).json({
                ok:true,
                msg:'login',
                ui: user._id,
                email,
                token
                
            });
        }

    }catch(err){

        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }

    
};

export const renew = async (req, res) => {
  try{
        const uid = req.uid;
        const name = req.name;

        const token = await generarJWT(uid,name);
        return res.status(200).json({
            ok:true,
            msg:'renew',
            token
        }); 

    }catch(err){

        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        }); 

    }

};