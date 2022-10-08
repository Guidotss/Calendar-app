import dotenv from 'dotenv';
dotenv.config();

export const config = {
    urlAtlas: `mongodb+srv://Guido:${process.env.DB_PASSWORD}@cluster0.tijy1to.mongodb.net/calendar?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}