import { Pool, QueryResult } from 'pg';
import { QueryParams } from '../types'; 
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

export const query = async (
  { text, params }: QueryParams
): Promise<QueryResult> => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    throw new Error(`Error executing query: ${err}`);
  }
};
