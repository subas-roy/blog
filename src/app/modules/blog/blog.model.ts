import { model, Schema } from 'mongoose'; // Mongoose library for MongoDB
import { TBlog } from './blog.interface'; // TypeScript interface for the blog

/**
 * Define the schema for the Blog model.
 * The schema maps to a MongoDB collection and defines the structure of documents.
 */
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String, // Blog title must be a string
      required: [true, 'Title is required'], // Title is mandatory
    },
    content: {
      type: String, // Blog content must be a string
      required: [true, 'Content is required'], // Content is mandatory
    },
    author: {
      type: Schema.Types.ObjectId, // Reference to the User collection
      ref: 'User', // Populate with User model details
      required: [true, 'User id is required'], // Author field is mandatory
    },
    isPublished: {
      type: Boolean, // Indicates if the blog is published
      default: true, // Default value is true
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Create and export the Blog model for database operations
export const Blog = model<TBlog>('Blog', blogSchema);
