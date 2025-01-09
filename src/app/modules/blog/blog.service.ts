import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogesFromDB = async (query: Record<string, unknown>) => {
  //{ email: {$regex: quer.searchTerm, $options: i}}
  //{ presentAddress: {$regex: quer.searchTerm, $options: i}}
  //{ 'name.firstName': {$regex: quer.searchTerm, $options: i}}

  let search = '';

  if (query?.search) {
    search = query?.search as string;
  }

  const result = await Blog.find({
    $or: ['title', 'content'].map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  }).populate('author');
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { isPublished: false },
    { new: true },
  );
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getAllBlogesFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
