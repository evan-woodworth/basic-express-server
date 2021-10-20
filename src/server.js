'use strict';

const express = require('express');
const app = express();

// Middleware
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');

// Error Handlers
const handle404 = require('./error-handlers/404.js');
const handle500 = require('./error-handlers/500.js');

app.use(express.json());
app.use(logger);
app.use(handle404);

app.use(validator);
app.get('/person', (req,res)=>{
  res.json({name: req.body.name});
});
app.use(handle500);

module.exports = {
  app,
  start: function(port) { app.listen(port, ()=>console.log('The Server is running')); },
};