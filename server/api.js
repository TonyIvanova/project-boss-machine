const express = require('express');
const apiRouter = express.Router();
const meetingsRouter = require('./meetings');
const ideasRouter = require('./ideas');
const minionsRouter = require('./minions'); 

apiRouter.use('/meetings', meetingsRouter); 
apiRouter.use('/ideas/', ideasRouter); 
apiRouter.use('/minions/', minionsRouter); 

module.exports = apiRouter;
