import { Types } from 'mongoose'; // Importing Mongoose Types to define ObjectId for MongoDB

// 1. Create an interface representing a document in MongoDB.
// This interface defines the structure of a blog document in the database.
export type TBlog = {
  title: string; // Title of the blog post
  content: string; // Main content of the blog post
  author: Types.ObjectId; // Reference to the author's ObjectId from the users collection
  isPublished: boolean; // Flag to indicate if the blog post is published or in draft mode
};
