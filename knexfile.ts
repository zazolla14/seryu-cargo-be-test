import dotenv from "dotenv";
import path from "path";
import getDirName from "./src/utils/path.js";

const __dirname = getDirName(import.meta.url);

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Destructure environment variables for cleaner access
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export default {
  development: {
    client: "pg",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "db/migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "db/seeds"),
    },
  },
};
