// Import necessary modules and configurations
import app from './app'; // Express application
import config from './app/config'; // Configuration file (contains database URL, port, etc.)
import mongoose from 'mongoose'; // MongoDB library for connecting to the database
import { Server } from 'http'; // Node.js module for creating an HTTP server

let server: Server; // Variable to store the server instance

// Main function to initialize the application
async function main() {
  try {
    // Connect to the MongoDB database using the URL from the config file
    await mongoose.connect(config.database_url as string);

    // Start the server and listen on the specified port from the config file
    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    // Log any errors encountered during database connection or server startup
    console.log(error);
  }
}

// Call the main function to start the application
main();

// Handle unhandled promise rejections (e.g., issues with async/await calls)
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected!, shutting down ...`);
  if (server) {
    // Close the server gracefully before exiting the process
    server.close(() => {
      process.exit(1); // Exit the process with an error code
    });
  }
  process.exit(1); // Exit if server instance is not defined
});

// Example to test unhandledRejection
// Promise.reject()

// Handle uncaught exceptions (e.g., runtime errors like referencing undefined variables)
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected!, shutting down ...`);
  process.exit(1); // Exit the process with an error code
});

// Example to test uncaughtException
// console.log(x);
