import { Events } from '../services/events.js';
import { validateErrors } from '../middlewares/validate-errors.js';

const events = new Events();


export const getAllEvents = async (req,res) => {
    try{
        const allEvents = await events.getAllEvents();
        res.status(200).json(allEvents);

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'An error has occurred while trying to get all events'
        });
    }
}

export const createEvent = async (req,res) => {
    try{
        const newEvent = await events.createEvent(req.body);
        if(newEvent){
            res.status(200).json({
                ok: true,
                msg: 'Event created successfully',
                newEvent
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'An error has occurred while trying to create an event'
        });
    }
}

export const updateEvent = async (req,res) => {
    try{
        const updatedEvent = await events.updateEvent(req.params.id,req.body);
        if(updatedEvent){
            res.status(200).json({
                ok: true,
                msg: 'Event updated successfully',
                updatedEvent
            });
        }else{
            res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'An error has occurred while trying to update an event'
        })
    }
}

export const deleteEvent = async (req,res) => {
    try{
        const { id } = req.params;
        const deletedEvent = await events.deleteEvent(id);
        if(deletedEvent){
            res.status(200).json({
                ok: true,
                msg: 'Event deleted successfully',
                deletedEvent
            });
        }else{
            res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'An error has occurred while trying to delete an event'
        })

    }
}