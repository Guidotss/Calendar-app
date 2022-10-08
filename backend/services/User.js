
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
    #matchPassword = ( password,hash ) => {
        return bcrypt.compareSync(password,hash);
    }

    async createUser(name,email,password){
        try{
            const user = await this.colletion.findOne({email}); 
            if(user){
                return false;
            }
            const newUser = new this.colletion({name,email,password:this.#encryptPassword(password)});
            return await newUser.save();
        }catch(err){
            console.log(err);
            throw new Error('Unexpected error');
        }
    }

    async loginUser (email,password){
        try{
            
            const user = await this.colletion.findOne({email});
            if(!user || !this.#matchPassword(password,user.password)){
                return false;
            }

            return user;

        }catch(err){
            console.log(err);
            throw new Error('Unexpected error');
        }
    } 


}


