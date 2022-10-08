import mongoose from 'mongoose';


export const EventsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    start:{
        type: Date,
    },
    end:{
        type: Date,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});