'use strict';

const app = require('./src/server.js');
const port = process.env.PORT || 3000;

app.start(port);