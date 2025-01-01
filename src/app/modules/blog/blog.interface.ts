import { Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
