import { Schema, model } from 'mongoose'; // Importing Mongoose modules for defining schemas and models
import { TUser } from './user.interface'; // Importing the user interface to define schema structure

// Defining the schema for the User collection in MongoDB
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true }, // User's name (required)
    email: { type: String, required: true, unique: true }, // User's email (required and unique)
    password: { type: String, required: true }, // User's password (required)
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // User's role (can be 'admin' or 'user', defaults to 'user')
    isBlocked: { type: Boolean, default: false }, // Flag to indicate if the user is blocked (defaults to false)
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

// Middleware: Modify the document after saving
// This function is executed after a user document is saved to the database
userSchema.post('save', function (doc, next) {
  doc.password = ''; // Clear the password field after saving (for security purposes)
  next(); // Proceed to the next middleware or function
});

// Helper function (Instance Method) - Check if a user exists by their ID
// This function queries the database to find a user by their ObjectId
export const isUserExistsById = async (id: string) => {
  return await User.findById(id); // Returns the user document if found, otherwise null
};

// Creating a Mongoose model for the User collection based on the schema
export const User = model<TUser>('User', userSchema);

/**
 * Pattern:
 * 1. Create Interface --> Defines the TypeScript interface (TUser) to ensure type safety
 * 2. Define Schema --> Specifies the database schema using Mongoose
 * 3. Create Model --> Generates a Mongoose model to interact with the database
 * 4. Query Database --> Use the model to perform database operations (e.g., find, save, update)
 */
