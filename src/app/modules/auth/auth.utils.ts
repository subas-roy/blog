import jwt from 'jsonwebtoken';

/**
 * Generates a JWT (JSON Web Token) based on the provided payload, secret key, and expiration time.
 *
 * This function is used to create a token that can be used for authentication and authorization purposes.
 * The token contains the user ID and role, and it is signed with the provided secret key. The token
 * also has an expiration time that is configurable.
 *
 * @param jwtPayload - The payload that will be included in the token, containing user information.
 *   - userId: The unique ID of the user.
 *   - role: The role of the user (e.g., 'admin', 'user').
 *
 * @param secret - The secret key used to sign the token. This is kept private and secure.
 * @param expiresIn - The expiration time of the token. For example: '1h', '30m', '7d'.
 *
 * @returns {string} The generated JWT token.
 */
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  // Sign the JWT with the payload, secret key, and expiration time
  return jwt.sign(jwtPayload, secret, {
    expiresIn, // Sets the token's expiration time
  });
};
