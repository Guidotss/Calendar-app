import mongoose from 'mongoose';
import { config } from './config.js';

async function connecDB() {
    try{
        mongoose.connect(config.urlAtlas, config.options)
        mongoose.connection.on('connected', () => {
            console.log('Connected to database');
        }); 

    }catch(err){
        console.log(err);
        throw new Error('Error on connect to DB');
    }
}

await connecDB();