import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from '@/types/blog';
import { mockBlogPosts } from './mockData';

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        content,
        excerpt,
        featured_image,
        published_at,
        author_id,
        author_name,
        author_role,
        author_avatar,
        read_time,
        category,
        featured
      `)
      .order('published_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blog posts:', error);
      return mockBlogPosts; // Fallback to mock data on error
    }
    
    // Transform the data to match our BlogPost type
    const posts: BlogPost[] = data.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      author_name: post.author_name || 'Anonymous',
      author_role: post.author_role || 'Author',
      author_avatar: post.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: post.read_time || `${Math.ceil((post.content?.length || 0) / 1000)} min read`,
      category: post.category || 'Research',
      image_url: post.featured_image || 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: post.featured || false,
      slug: post.slug
    }));
    
    return posts.length > 0 ? posts : mockBlogPosts;
  } catch (error) {
    console.error('Exception fetching blog posts:', error);
    return mockBlogPosts; // Fallback to mock data on exception
  }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching blog post:', error);
      // Try to find in mock data as fallback
      const mockPost = mockBlogPosts.find(post => post.slug === slug);
      return mockPost || null;
    }
    
    // Transform to match our BlogPost type
    const post: BlogPost = {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || '',
      author_name: data.author_name || 'Anonymous',
      author_role: data.author_role || 'Author',
      author_avatar: data.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: data.read_time || `${Math.ceil((data.content?.length || 0) / 1000)} min read`,
      category: data.category || 'Research',
      image_url: data.featured_image || 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: data.featured || false,
      slug: data.slug
    };
    
    return post;
  } catch (error) {
    console.error('Exception fetching blog post:', error);
    // Try to find in mock data as fallback
    const mockPost = mockBlogPosts.find(post => post.slug === slug);
    return mockPost || null;
  }
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost | null> => {
  try {
    // Ensure we have required fields
    if (!post.title || !post.slug) {
      console.error('Missing required fields for blog post');
      return null;
    }
    
    // Get current user to set as author
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('User not authenticated');
      return null;
    }
    
    // Set default avatar if not provided
    if (!post.author_avatar) {
      post.author_avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80';
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featured_image: post.image_url,
        published_at: new Date().toISOString(),
        author_id: user.id,
        author_name: post.author_name,
        author_role: post.author_role,
        author_avatar: post.author_avatar,
        read_time: post.read_time,
        category: post.category,
        featured: post.featured || false
      }])
      .select();
      
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      console.error('No data returned after creating blog post');
      return null;
    }
    
    // Return transformed post
    return {
      id: data[0].id,
      title: data[0].title,
      excerpt: data[0].excerpt || '',
      content: data[0].content || '',
      author_name: data[0].author_name || post.author_name,
      author_role: data[0].author_role || post.author_role,
      author_avatar: data[0].author_avatar || post.author_avatar,
      publish_date: data[0].published_at ? new Date(data[0].published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: data[0].read_time || post.read_time,
      category: data[0].category || post.category,
      image_url: data[0].featured_image || post.image_url,
      featured: data[0].featured || post.featured || false,
      slug: data[0].slug
    };
  } catch (error) {
    console.error('Exception creating blog post:', error);
    return null;
  }
};

// Update an existing blog post
export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    console.log("Updating blog post with ID:", id, "Data:", post);
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('User not authenticated');
      return null;
    }
    
    const updateData: any = {};
    
    // Only add fields that are provided and not undefined
    if (post.title !== undefined) updateData.title = post.title;
    if (post.slug !== undefined) updateData.slug = post.slug;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.image_url !== undefined) updateData.featured_image = post.image_url;
    if (post.category !== undefined) updateData.category = post.category;
    if (post.author_name !== undefined) updateData.author_name = post.author_name;
    if (post.author_role !== undefined) updateData.author_role = post.author_role;
    if (post.author_avatar !== undefined) updateData.author_avatar = post.author_avatar;
    if (post.read_time !== undefined) updateData.read_time = post.read_time;
    if (post.featured !== undefined) updateData.featured = post.featured;
    
    // Always update the timestamp when making changes
    updateData.updated_at = new Date().toISOString();
    
    console.log("Update data being sent to Supabase:", updateData);
    
    // Don't attempt update if there are no changes
    if (Object.keys(updateData).length === 0) {
      console.error('No fields to update');
      return null;
    }
    
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      console.error('No data returned after updating blog post');
      return null;
    }
    
    console.log("Post updated successfully. Response data:", data);
    
    // Return transformed post with the updated values
    return {
      id: data[0].id,
      title: data[0].title,
      excerpt: data[0].excerpt || '',
      content: data[0].content || '',
      author_name: data[0].author_name || 'Anonymous',
      author_role: data[0].author_role || 'Author',
      author_avatar: data[0].author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: data[0].published_at ? new Date(data[0].published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: data[0].read_time || `${Math.ceil((data[0].content?.length || 0) / 1000)} min read`,
      category: data[0].category || 'Research',
      image_url: data[0].featured_image || 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: data[0].featured || false,
      slug: data[0].slug
    };
  } catch (error) {
    console.error('Exception updating blog post:', error);
    return null;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    console.log("Starting deletion of blog post with ID:", id);
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('User not authenticated');
      return false;
    }
    
    // First get the post to check if it has an image to delete
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('featured_image')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching post for deletion:', fetchError);
      // Continue with deletion even if fetching image fails
    }
    
    // Delete the post from the database
    console.log("Attempting to delete post from database with ID:", id);
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    
    console.log("Post deleted successfully from database");
    
    // If post had an image and it's from our storage, delete it from storage
    if (post?.featured_image && post.featured_image.includes('storage')) {
      try {
        console.log("Post had a featured image:", post.featured_image);
        // Extract the file path from the URL
        const url = new URL(post.featured_image);
        const pathParts = url.pathname.split('/');
        
        // The file path will be after the bucket name in the URL
        // Find the index of blog-images in the path
        const bucketIndex = pathParts.findIndex(part => part === 'blog-images');
        if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
          // Get everything after the bucket name as the file path
          const filePath = pathParts.slice(bucketIndex + 1).join('/');
          
          console.log("Extracted file path:", filePath);
          
          if (filePath) {
            const { error: storageError } = await supabase
              .storage
              .from('blog-images')
              .remove([filePath]);
              
            if (storageError) {
              console.error('Error deleting image from storage:', storageError);
              // Don't fail the post deletion if image deletion fails
            } else {
              console.log("Image deleted successfully from storage");
            }
          }
        } else {
          console.log("Could not find bucket path in URL");
        }
      } catch (imageError) {
        console.error('Error processing image deletion:', imageError);
        // Don't fail the post deletion if image deletion fails
      }
    }
    
    return true;
  } catch (error) {
    console.error('Exception deleting blog post:', error);
    return false;
  }
};
