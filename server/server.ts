import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes';
import cors from 'cors';
import { query } from './models/postgres';

dotenv.config();

const app = express();

// -------------CONNECTION TO PORT--------------//
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// -------------parse incoming requests------------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

// ------------------- ERROR HANDLER ------------------------

/**
 * Global error handler
 */

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  res.status(500).send({ error: err });
});

// // ------------------- CONNECT TO SERVER AND DB ------------------------

const start = async () => {
  try {
    // Test the database connection by executing a simple query
    const testQueryResult = await query({ text: 'SELECT NOW()' });

    if (testQueryResult.rows.length > 0) {
      console.log('Database connected successfully.');
      // Start the server once the database connection is established
      app.listen(PORT, () =>
        console.log(`Beep. Boop. Listening on port ${PORT}`)
      );
    } else {
      throw new Error('Database connection test failed.');
    }
  } catch (err: any) {
    console.log('Database Error:', err.message);
  }
};

start();

export default app;
