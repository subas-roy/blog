// Define a constant object to represent user roles
// This object contains all the roles that users can have in the system
export const USER_ROLE = {
  admin: 'admin', // Role for administrators with higher-level permissions
  user: 'user', // Role for regular users with standard permissions
} as const; // The `as const` ensures that the object values are treated as literal types
