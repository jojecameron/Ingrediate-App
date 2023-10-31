const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { routes } = require('./routes/routes.js');
const cors = require('cors');
dotenv.config();
mongoose.set('strictQuery', false);

// -------------CONNECTION TO PORT--------------//
const PORT = process.env.PORT || 3000;

// -------------MONGODB CONNECTION STRING--------------//

const MONGODB_PW = process.env.MONGODB_PW;

// -------------parse incoming requests------------//
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.use(routes);

// ------------------- UNKNOWN ROUTES ------------------------

/**
 * 404 handler
 */

app.use('*', (_req, res) => {
  res.status(404).send('Not Found');
});

// ------------------- ERROR HANDLER ------------------------

/**
 * Global error handler
 */

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

// // ------------------- CONNECT TO SERVER AND DB ------------------------

const start = async () => {
  try {
    // await mongoose.connect(
    //   `mongodb+srv://jojecam:${MONGODB_PW}@cluster0.co3wbki.mongodb.net/?retryWrites=true&w=majority`
    // );
    // console.log('Connected to Database!');
    app.listen(PORT, () =>
      console.log(`Beep. Boop. Listening on port ${PORT}`)
    );
  } catch (err) {
    console.log('Database Error:', err.message);
  }
};

start();

module.exports = app;
