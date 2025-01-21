/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing necessary modules and types
import express, { Application, NextFunction, Request, Response } from 'express'; // Express framework and types
import cors from 'cors'; // Middleware for enabling Cross-Origin Resource Sharing
import { userRoutes } from './app/modules/user/user.route'; // Routes for user-related operations
import globalErrorHandler from './app/middlewares/globalErrorHandler'; // Global error handling middleware
import notFound from './app/middlewares/notFound'; // Middleware to handle 404 errors
import { blogRoutes } from './app/modules/blog/blog.route'; // Routes for blog-related operations
import { authRoutes } from './app/modules/auth/auth.routes'; // Routes for authentication
import cookieParser from 'cookie-parser'; // Middleware to parse cookies

// Create an Express application instance
const app: Application = express();

// Middleware for parsing JSON bodies in incoming requests
app.use(express.json());

// Middleware for parsing cookies in incoming requests
app.use(cookieParser());

// Enable CORS with specific allowed origins
app.use(cors({ origin: ['http://localhost:5173'] }));

// Application routes
app.use('/api/auth/', userRoutes);
app.use('/api/admin/users/', userRoutes); // Routes for admin user management
app.use('/api/admin/blogs/', authRoutes); // Routes for admin blog management
app.use('/api/blogs/', blogRoutes); // Routes for public blog access
app.use('/api/auth/', authRoutes);

// Default route for the root URL
app.get('/', (req: Request, res: Response) => {
  const a = 10; // Example variable (can be replaced with actual logic)
  res.send(a); // Send the value of `a` as the response
});

// Middleware for handling global errors
// Middleware for handling global errors (positioned after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

// Middleware for handling 404 Not Found errors
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

// Export the Express application instance
export default app;
