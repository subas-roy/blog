import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let search = '';
  if (query?.search) {
    search = query.search as string;
  }

  // Exclude non-filtering fields
  const excludeFields = [
    'search',
    'sortBy',
    'sortOrder',
    'limit',
    'page',
    'fields',
    'filter',
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  // Search handling
  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  // Apply additional filter
  if (query.filter) {
    queryObj._id = query.filter;
  }

  const filterQuery = searchQuery.find(queryObj).populate('author');

  // Sorting
  let sort = '-createdAt';
  if (query.sortBy) {
    const sortOrder = query.sortOrder === 'asc' ? '' : '-';
    sort = `${sortOrder}${query.sortBy}`;
  }

  const sortQuery = filterQuery.sort(sort);

  // Pagination
  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip).limit(limit);

  // Field Limiting
  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  // Execute query with selected fields
  const result = await paginateQuery.select(fields);

  return result;
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
