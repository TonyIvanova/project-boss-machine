// - `/meetings`
//   - GET /meetings to get an array of all meetings.
//   - POST /meetings to create a new meeting and save it to the database.
//   - DELETE /meetings to delete _all_ meetings from the database.
const express = require("express");
const meetingsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting} = require('./db')

// `getAllFromDatabase`:
// - Takes only the single argument for model name. 
// Returns the array of elements in the database or `null` if 
// an invalid argument is supplied
meetingsRouter.get("/", (req, res, next) => {
    const meetingsData = getAllFromDatabase('meetings'); 
     res.status(200).send(meetingsData); 
});


// `addToDatabase`:
// - Takes the model name argument and a second argument
//  which is an object with the key-value pairs of 
//  the new instance. `addToDatabase` handles assigning 
//  `.id` properties to the instances. It does not check
//   to make sure that valid inputs are supplied, so you will
//    have to add those checks to your routes if necessary. 
meetingsRouter.post("/", (req, res, next) => {
    //create a new meeting and save it to the database.
   createMeeting(); 
   res.status(200).send('Meeting created')
    
    
});

// `deleteAllFromDatabase`:

// - Takes only the single argument for 
// model name. Deletes all elements from 
// the proper model and returns a new, empty 
//  array. You will only need to use this 
//  function for a /api/meetings route.

meetingsRouter.delete("/", (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(200).send('every meeting deleted!');

});

module.exports = meetingsRouter;
