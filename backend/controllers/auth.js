import { validationResult } from 'express-validator';
import Usuario from '../models/UserModel.js';
import { generarJWT } from '../helpers/jwt.js'

export const register = async (req, res) => {

    const { email,name, password }  = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    try {
        const user = await Usuario.findOne({email});

        const newUser = new Usuario({name,email});
        newUser.password = newUser.encryptPassword(password);

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'User already exists'
            }); 
        }else{
            await newUser.save();
            const token = await generarJWT(newUser.id,newUser.name);
            return res.status(201).json({
                ok: true,
                msg: 'register',
                name,
                email,
                password,
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
export const login = async (req, res) => {

    const { email, password }  = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    try{
        const user = await Usuario.findOne({email});

        if(!user || !user.matchPassword(password,user.password)){
            return res.status(400).json({
                ok:false,
                msg:'Email or password incorrect'
            });
        }

        const token = await generarJWT(user.id,user.name);
        return res.status(200).json({
            ok:true,
            msg:'login',
            ui: user._id,
            email,
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