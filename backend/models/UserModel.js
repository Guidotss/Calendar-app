import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}); 
userSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}
userSchema.methods.matchPassword = (password,hash) => {
    return bcrypt.compareSync(password,hash);
}
