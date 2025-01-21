import { blogSearchableFields } from './blog.constant'; // Import the fields that can be searched
import { TBlog } from './blog.interface'; // Type definition for the Blog interface
import { Blog } from './blog.model'; // Blog model for database interaction

/**
 * Service to create a new blog in the database.
 * @param payload - Blog data conforming to the TBlog interface.
 * @returns The newly created blog document.
 */
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload); // Save the blog in the database
  return result;
};

/**
 * Service to fetch all blogs from the database with support for search, filtering, sorting, and pagination.
 * @param query - Query parameters for search, filter, sort, and pagination.
 * @returns A list of blogs matching the query criteria.
 */
const getAllBlogesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // Clone query to avoid mutating the original object

  let search = '';
  if (query?.search) {
    search = query.search as string; // Extract search term from the query
  }

  // Exclude fields that are not meant for filtering
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

  // Construct search query
  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }, // Case-insensitive search
    })),
  });

  // Apply additional filters based on the query
  if (query.filter) {
    queryObj._id = query.filter; // Support filtering by specific ID
  }

  const filterQuery = searchQuery.find(queryObj).populate('author'); // Populate author details

  // Apply sorting
  let sort = '-createdAt'; // Default sort by creation date (descending)
  if (query.sortBy) {
    const sortOrder = query.sortOrder === 'asc' ? '' : '-'; // Determine sort order
    sort = `${sortOrder}${query.sortBy}`;
  }

  const sortQuery = filterQuery.sort(sort); // Apply sorting to the query

  // Handle pagination
  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit); // Limit the number of results
  }

  if (query.page) {
    page = Number(query.page); // Determine the current page
    skip = (page - 1) * limit; // Calculate the skip value
  }

  const paginateQuery = sortQuery.skip(skip).limit(limit); // Apply pagination

  // Field selection
  let fields = '-__v'; // Exclude version field by default
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' '); // Include specific fields
  }

  const result = await paginateQuery.select(fields); // Execute the query with field selection
  return result;
};

/**
 * Service to fetch a single blog by its ID.
 * @param id - The ID of the blog to fetch.
 * @returns The blog document or null if not found.
 */
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author'); // Fetch the blog and populate author details
  return result;
};

/**
 * Service to update a blog by its ID.
 * @param id - The ID of the blog to update.
 * @param payload - Partial data for updating the blog.
 * @returns The updated blog document or null if not found.
 */
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
  });
  return result;
};

/**
 * Service to delete a blog by marking it as unpublished.
 * @param id - The ID of the blog to delete.
 * @returns The updated blog document or null if not found.
 */
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { isPublished: false }, // Mark the blog as unpublished
    { new: true }, // Return the updated document
  );
  return result;
};

// Export all blog-related services for use in other parts of the application
export const blogServices = {
  createBlogIntoDB,
  getAllBlogesFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
