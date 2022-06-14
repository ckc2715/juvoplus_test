import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from 'config/dotenv';

export const knexConfig = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  }
};
