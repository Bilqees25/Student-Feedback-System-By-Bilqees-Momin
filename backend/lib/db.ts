'use server';

import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

let pool: Pool | null = null;

const createPool = () => {
  if (pool) {
    return pool;
  }

  // Rely on environment variables being loaded by the start command.
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
    let missingVars = [];
    if (!DB_HOST) missingVars.push('DB_HOST');
    if (!DB_USER) missingVars.push('DB_USER');
    if (!DB_PASSWORD) missingVars.push('DB_PASSWORD');
    if (!DB_DATABASE) missingVars.push('DB_DATABASE');
    throw new Error(`Missing required environment variables for database connection: ${missingVars.join(', ')}`);
  }
  
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
};

export default createPool;
