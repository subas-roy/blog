// Importing necessary modules
import dotenv from 'dotenv'; // Library to load environment variables from a .env file
import path from 'path'; // Built-in Node.js module to work with file and directory paths

// Load environment variables from a specific .env file
// Using `path.join` to construct the absolute path to the `.env` file
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// Exporting the configuration object
// This object contains environment-specific variables used throughout the application
export default {
  // NODE_ENV: Indicates the current environment (e.g., development, production, testing)
  NODE_ENV: process.env.NODE_ENV,

  // Port on which the application server will run
  port: process.env.PORT,

  // URL of the database (e.g., PostgreSQL, MongoDB) used by the application
  database_url: process.env.DATABASE_URL,

  // JWT (JSON Web Token) secrets and expiration times for secure authentication
  // Secret key for generating and verifying access tokens
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,

  // Secret key for generating and verifying refresh tokens
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  // Expiration time for access tokens (e.g., '15m' for 15 minutes)
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,

  // Expiration time for refresh tokens (e.g., '7d' for 7 days)
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
