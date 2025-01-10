import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogesFromDB = async (query: Record<string, unknown>) => {
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
  const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((el) => delete queryObj[el]);

  console.log({ query }, { queryObj });

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

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // field limiting

  let fields = '-__v';
  // fields: 'name,email';
  // fields: 'name email';

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log(fields);
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
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
