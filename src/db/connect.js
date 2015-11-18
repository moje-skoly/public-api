import mongoose from 'mongoose';
import cfg from '../config/dbConnection'; 

/**
 * A function, which will yield a DB connection.
 * @return	Mongoose connection to the database.
 */
export default function() {
	mongoose.connect(`mongodb://${cfg.host}/${cfg.collection}`);	
	return mongoose.connection;
}