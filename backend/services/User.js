
import mongoose from 'mongoose';
import { userSchema } from '../models/UserModel.js';
import bcrypt from 'bcrypt';


export class User {
    constructor(){
        this.colletion = mongoose.model('User',userSchema);
    }
    #encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password,salt);
    }
    #matchPassword = (password,hash) => {
        return bcrypt.compareSync(password,hash);
    }

    async createUser(name,email,password){
        try{
            const user = await this.colletion.findOne({email}); 
            if(user){
               throw new Error('User already exists');
            }
            
            const newUser = new this.colletion({name,email});
            newUser.password = this.#encryptPassword(password);
            await newUser.save();

        }catch(err){
            console.log(err);
            throw new Error('Unexpected error');
        }
    }


}


