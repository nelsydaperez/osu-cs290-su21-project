// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/exercises',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set('useCreateIndex', true);

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise with the given parameters.
 * Parameters include  name, reps, weight, unit and date.
 * @param {Object} params
 * @returns A promise. Resolves to the JSON object for the document created by calling save.
 */
const createExercise = async (params) => {
    // Call the constructor to create an instance of the model class Exercise 
    const exercise = new Exercise(params);
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const getExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Replace the given parameters of the exercise with the id value provided
 * Given parameters contains name, reps, weight, unit and date.
 * @param {String} _id 
 * @param {Object} params
 * @returns A promise. Resolves to the updated JSON of the exercise with the specified _id.
 */
const updateExercise = async (_id, params) => {
    const result = await Exercise.replaceOne({ _id: _id }, params);
    const updatedExercise = getExercises({ _id: _id }, '', 0);
    return updatedExercise;
}

/**
 * Delete exercise(s) with the given _id number.
 * @param {String} _id
 * @returns A promise.
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return;
}

export { createExercise, getExercises, updateExercise, deleteExercise };