import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// 2. Create a Schema corresponding to the document interface.
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model
export const Blog = model<TBlog>('Blog', blogSchema);
