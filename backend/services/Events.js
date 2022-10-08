import mongoose from "mongoose";
import { EventsSchema } from "../models/EventsModel.js";

export class Events {
    constructor(){
        this.collection = mongoose.model('Events',EventsSchema);
    }
    async getAllEvents(){
        try{
            return await this.collection.find();
        }catch(err){
            console.log(err);
            throw new Error('An has error occurred while trying to get all events');
        }
    }

    async createEvent(event){
        try{
            return await this.collection.create(event);
        }catch(err){
            console.log(err);
            throw new Error('An has error occurred while trying to create an event');
        }
    }

    async updateEvent(id,event){
        try{
            const updatedEvent = await this.collection.findByIdAndUpdate(id,event);
            if(updatedEvent){
                return updatedEvent;
            }else{
                throw new Error('An has error occurred while trying to update an event');
            }
        }catch(err){
            console.log(err);
            throw new Error('An has error occurred while trying to update an event');
        }
    }

    async deleteEvent(id){
        try{
            
            if(id.length !== 24){
                throw new Error('Invalid id');
            }

            const deletedEvent = await this.collection.findByIdAndDelete(id);
            if(deletedEvent){
                return deletedEvent;
            }else{
                return false
            }
        }catch(err){
            console.log(err);
            throw new Error('An has error occurred while trying to delete an event');
        }
    }
}