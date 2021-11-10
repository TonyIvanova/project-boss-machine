// - `/ideas`
//   - GET /ideas to get an array of all ideas.
//   - POST /ideas to create a new idea and save it to the database.
//   - GET /ideas/:ideaId to get a single idea by id.
//   - PUT /ideas/:ideaId to update a single idea by id.
//   - DELETE /ideas/:ideaId to delete a single idea by id.
const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
  const ideasData = getAllFromDatabase("ideas");
  res.status(200).send(ideasData);
});

ideasRouter.post("/", (req, res, next) => {
  const newIdea = req.body;
  const added = addToDatabase("ideas", newIdea);
  if (added) {
    res.status(200).send(added);
  } else {
    res.status(400).send(`Couldn't add an idea :<`);
  }
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaData = getFromDatabaseById("ideas", ideaId);
  if (ideaData !== -1) {
    res.status(200).send(ideaData);
  } else {
    res.status(404).send(`Idea with id ${ideaId} not found`);
  }
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const ideaData = req.body;
  let updated = updateInstanceInDatabase("ideas", ideaData);
  if (updated) {
    res.status(200).send(ideaData);
  } else {
    res.status(400).send(`Invalid Input`);
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const deleted = deleteFromDatabasebyId("ideas", ideaId);
  if (deleted) {
    res.status(200).send(`idea ${ideaId} was deleted`);
  } else {
    res.status(404).send(`idea ${ideaId} was not found!`);
  }
});

module.exports = ideasRouter;
