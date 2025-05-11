
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from '@/types/blog';

// Default mock data for fallback
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Anxiety: Causes and Treatment Options",
    excerpt: "Learn about the root causes of anxiety disorders and explore effective treatment approaches.",
    content: "<p>Anxiety disorders are a group of mental health conditions characterized by significant feelings of anxiety and fear. These feelings are strong enough to interfere with daily activities.</p><p>Common treatment options include cognitive behavioral therapy (CBT), medication, and lifestyle changes like regular exercise and mindfulness practices.</p>",
    author_name: "Dr. Sarah Johnson",
    author_role: "Clinical Psychologist",
    author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-09-15",
    read_time: "6 min read",
    category: "Treatment",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: true,
    slug: "understanding-anxiety-causes-and-treatment-options"
  },
  {
    id: "2",
    title: "Digital Tools for Mental Health Support",
    excerpt: "Discover how technology is transforming access to mental health resources and support systems.",
    content: "<p>With the advancement of technology, mental health support is becoming more accessible than ever before. From meditation apps to online therapy sessions, digital tools are bridging gaps in care.</p><p>Studies show that digital interventions can be effective for conditions like mild to moderate depression and anxiety, especially when combined with traditional therapy approaches.</p>",
    author_name: "Alex Rivera",
    author_role: "Tech & Wellbeing Specialist",
    author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-08-28",
    read_time: "4 min read",
    category: "Technology",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: false,
    slug: "digital-tools-for-mental-health-support"
  },
  {
    id: "3",
    title: "Building Meaningful Connections in a Digital Age",
    excerpt: "Strategies for fostering genuine human connections while navigating our increasingly digital world.",
    content: "<p>Despite being more 'connected' than ever through technology, many people report feeling increasingly isolated. This article explores the paradox of modern connection and offers practical strategies for building meaningful relationships.</p><p>Research suggests that quality of relationships, rather than quantity, is what contributes most significantly to mental wellbeing and life satisfaction.</p>",
    author_name: "Maya Patel",
    author_role: "Social Psychologist",
    author_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-08-10",
    read_time: "7 min read",
    category: "Connection",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: false,
    slug: "building-meaningful-connections-in-a-digital-age"
  }
];

// Upload an image to Supabase Storage
export const uploadBlogImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    // Use crypto.randomUUID() instead of uuid package
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase
      .storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('blog-images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading image:', error);
    return null;
  }
};

// Upload author avatar image to Supabase Storage
export const uploadAuthorAvatar = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `avatar-${crypto.randomUUID()}.${fileExt}`;
    
    const { data, error } = await supabase
      .storage
      .from('blog-images')
      .upload(`avatars/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('blog-images')
      .getPublicUrl(`avatars/${fileName}`);
    
    return publicUrl;
  } catch (error) {
    console.error('Exception uploading avatar:', error);
    return null;
  }
};

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
        author_id
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
      author_name: 'Anonymous', // Default values since we don't have author table yet
      author_role: 'Author',
      author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: `${Math.ceil((post.content?.length || 0) / 1000)} min read`,
      category: 'Research', // Default category - we'll update this in the future
      image_url: post.featured_image || 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: false,
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
      author_name: 'Anonymous', // Default values until we implement author table
      author_role: 'Author',
      author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: `${Math.ceil((data.content?.length || 0) / 1000)} min read`,
      category: 'Research', // Default category
      image_url: data.featured_image || 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: false,
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
        author_id: user.id
      }])
      .select();
      
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    // Return transformed post
    return {
      id: data[0].id,
      title: data[0].title,
      excerpt: data[0].excerpt || '',
      content: data[0].content || '',
      author_name: post.author_name,
      author_role: post.author_role,
      author_avatar: post.author_avatar,
      publish_date: data[0].published_at ? new Date(data[0].published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: `${Math.ceil((data[0].content?.length || 0) / 1000)} min read`,
      category: post.category,
      image_url: data[0].featured_image || '',
      featured: post.featured || false,
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
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('User not authenticated');
      return null;
    }
    
    const updateData: any = {};
    
    if (post.title) updateData.title = post.title;
    if (post.slug) updateData.slug = post.slug;
    if (post.content) updateData.content = post.content;
    if (post.excerpt) updateData.excerpt = post.excerpt;
    if (post.image_url) updateData.featured_image = post.image_url;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
    
    // Return transformed post with the updated values from the request
    // or original values if they weren't updated
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || '',
      author_name: post.author_name || 'Anonymous',
      author_role: post.author_role || 'Author',
      author_avatar: post.author_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      publish_date: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      read_time: `${Math.ceil((data.content?.length || 0) / 1000)} min read`,
      category: post.category || 'Research',
      image_url: data.featured_image || '',
      featured: post.featured || false,
      slug: data.slug
    };
  } catch (error) {
    console.error('Exception updating blog post:', error);
    return null;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
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
      return false;
    }
      
    // Delete the post from the database
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    
    // If post had an image and it's from our storage, delete it from storage
    if (post?.featured_image && post.featured_image.includes('blog-images')) {
      try {
        // Extract the file path from the URL
        const url = new URL(post.featured_image);
        const pathParts = url.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        if (fileName) {
          await supabase
            .storage
            .from('blog-images')
            .remove([fileName]);
        }
      } catch (imageError) {
        console.error('Error deleting blog image:', imageError);
        // Don't fail the post deletion if image deletion fails
      }
    }
    
    return true;
  } catch (error) {
    console.error('Exception deleting blog post:', error);
    return false;
  }
};
