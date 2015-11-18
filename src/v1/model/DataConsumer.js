import mongoose from 'mongoose';

/**
 * The schema of a document in the collection.
 */
var DataConsumerSchema = mongoose.Schema({
	name: String,
	email: String
});

/**
 * The model based on the defined schema.
 */
export default mongoose.model('DataConsumer', DataConsumerSchema);