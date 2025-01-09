import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogesFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query);
  const queryObj = { ...query };

  //{ email: {$regex: quer.searchTerm, $options: i}}
  //{ presentAddress: {$regex: quer.searchTerm, $options: i}}
  //{ 'name.firstName': {$regex: quer.searchTerm, $options: i}}

  const blogSearchableFields = ['title', 'content'];

  let search = '';

  if (query?.search) {
    search = query?.search as string;
  }

  // filtering
  const excludeFields = ['search', 'sort', 'limit'];
  excludeFields.forEach((el) => delete queryObj[el]);

  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery.find(queryObj).populate('author');

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if (query.limit) {
    limit = query.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
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
