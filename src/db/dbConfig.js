import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Wrap the pool's getConnection method in a Promise
export function connect() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to MySQL: ", err);
        reject(err);
        return;
      }

      // Log connection success
      console.log("MySQL Connected successfully");

      // Release the connection back to the pool
      connection.release();
      resolve();
    });
  });
}

// Export the pool for direct use if needed
export { pool };
