
// Main service file that re-exports all blog related functionality

// Re-export functions from the individual service files
export {
  uploadBlogImage,
  uploadAuthorAvatar
} from './imageUploadService';

export {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from './blogPostService';

export {
  mockBlogPosts
} from './mockData';
