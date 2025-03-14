import { TUser } from './user.interface'; // Importing the user interface to enforce type safety
import { User } from './user.model'; // Importing the User model to interact with the database

// Service function to create a new user in the database
const createUserIntoDB = async (user: TUser) => {
  // Sanitize user data and enforce default role as 'user'
  const sanitizedUser = {
    ...user, // Spread the user data
    role: 'user', // Set the role to 'user' by default
  };
  const result = await User.create(sanitizedUser); // Save the user data into the database

  // Fetch the user without sensitive data
  const filteredUser = await User.findById(result._id)
    .select('-password')
    .select('-role')
    .select('-isBlocked')
    .select('-createdAt')
    .select('-updatedAt')
    .select('-__v');

  return filteredUser; // Return the filteredUser document
};

// Service function to block a user in the database
const blockUserIntoDB = async (id: string) => {
  await User.findByIdAndUpdate(
    id, // User ID to be blocked
    { isBlocked: true }, // Update the `isBlocked` field to true
    // { new: true }, // Return the updated document after the update
  );
};

// Exporting the user services as an object
export const userServices = {
  createUserIntoDB, // Service to create a user
  blockUserIntoDB, // Service to block a user
};
