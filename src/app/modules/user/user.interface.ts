import { USER_ROLE } from './user.constant'; // Importing constants that define user roles

// 1. Create an interface representing a document in MongoDB.
// This interface defines the structure of a user document stored in the database.
export type TUser = {
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password for user authentication
  role: 'admin' | 'user'; // Role of the user (can either be 'admin' or 'user')
  isBlocked: boolean; // Indicates whether the user account is blocked
};

// Define a type for user roles based on the keys of the USER_ROLE constant
// This ensures the role values are consistent with the predefined roles.
export type TUserRole = keyof typeof USER_ROLE;
