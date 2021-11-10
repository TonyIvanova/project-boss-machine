// - `/minions`
//   - GET /minions to get an array of all minions.
//   - POST /minions to create a new minion and save it to the database.
//   - GET /minions/:minionId to get a single minion by id.
//   - PUT /minions/:minionId to update a single minion by id.
//   - DELETE /minions/:minionId to delete a single minion by id.
const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  const minionsData = getAllFromDatabase("minions");
  res.status(200).send(minionsData);
});

minionsRouter.post("/", (req, res, next) => {
  addToDatabase("minions", req.body);
  res.status(200).send(req.body);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const minionData = getFromDatabaseById("minions", minionId);
  if (minionData !== -1) {
    res.status(200).send(minionData);
  } else {
    res.status(404).send(`Minion with id ${minionId} does not exist!`);
  }
});


// `updateInstanceInDatabase`:

// - Takes the model name argument and a second argument
//  which is an object representing an updated instance. 
//  The instance provided must have a valid `.id` property 
//  which will be used to match. `updateInstanceInDatabase` 
//  will return the updated instance in the database or `null` 
//  with invalid inputs. This function will validate the schema
//   of the updated instance and throw an error if it is invalid.

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionData = req.body; 
    let updated = updateInstanceInDatabase('minions', minionData);
    if (updated) {
        res.status(200).send(minionData);
    } else {
        res.status(400).send(`Invalid Input`); 
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId; 
    const deleted = deleteFromDatabasebyId('minions', minionId);
    if (deleted){
        res.status(200).send(`Minion ${minionId} was deleted`);
    } else {
        res.status(404).send(`Minion ${minionId} was not found!`)
    }

})


module.exports = minionsRouter;
