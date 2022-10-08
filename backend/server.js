import express from 'express'; 
import dotenv from 'dotenv';
import morgan from 'morgan';
import eventsRoutes from './routes/events.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import './database/connect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; 


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',authRoutes);
app.use('/api/events',eventsRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${ server.address().port }`);
}); 
