const express = require('express');
const app = express();
const { routes } = require('./routes/routes.js');
const cors = require('cors');


// -------------CONNECTION TO PORT--------------//
const PORT = 3000;

// -------------parse incoming requests------------//
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: 'http://localhost:8080'
  }));
  


app.use(routes);


app.use((err, _req, res, _next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));

module.exports = app;