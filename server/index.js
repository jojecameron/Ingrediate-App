const express = require('express');
const app = express();
const { routes } = require('./routes.js');

// -------------CONNECTION TO PORT--------------//
const PORT = 3000;

// -------------parse incoming requests------------//
app.use(express.json());

app.use(routes);

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));