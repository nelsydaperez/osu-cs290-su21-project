import * as exercises from './exercises_model.js';
import express from 'express';
const app = express();
app.use(express.urlencoded()); 
app.use(express.json());

const PORT = 3000;

/**
 * Create a new user with the  name, reps, weight, unit and date in the body parameters
 */
app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body)
        .then(exercise => {
            res.status(201).send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'Invalid entry. POST request failed.' });
        });
});

/**
 * Retrieve a JSON object with all exercises. 
 */
app.get("/exercises", (req, res) => {
    exercises.getExercises({}, '', 0)
        .then(exercises => {
            res.status(200).send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'GET request failed.' });
        });
});

/**
 * Update the exercise whose _id is provided and set their name, reps, weight, unit and date to
 */
app.put("/exercises/:id", (req, res) => {
    exercises.updateExercise(req.params.id, req.body)
        .then(exercises => {
            res.status(200).send(exercises[0]);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ Error: 'Cannot find specified ID. PUT request failed.' });
        });
});

/**
 * Delete exercise under provided _id
 */
app.delete("/exercises/:id", (req, res) => {
    exercises.deleteExercise(req.params.id)
        .then(result => {
            res.status(204).send(result);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'Cannot find specified ID. DELETE request failed.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});