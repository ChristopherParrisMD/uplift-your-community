
import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

// Default mock data for when Supabase is not configured
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

// Try to get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client if credentials are available
let supabase: any = null;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase credentials not found. Using mock data instead.');
}

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!isSupabaseConfigured) {
    console.log('Using mock blog posts data');
    return Promise.resolve(mockBlogPosts);
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false });
      
    if (error) {
      console.error('Error fetching blog posts:', error);
      return mockBlogPosts; // Fallback to mock data on error
    }
    
    return data as BlogPost[];
  } catch (error) {
    console.error('Exception fetching blog posts:', error);
    return mockBlogPosts; // Fallback to mock data on exception
  }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!isSupabaseConfigured) {
    const post = mockBlogPosts.find(post => post.slug === slug);
    return Promise.resolve(post || null);
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching blog post:', error);
      // Try to find in mock data as fallback
      const mockPost = mockBlogPosts.find(post => post.slug === slug);
      return mockPost || null;
    }
    
    return data as BlogPost;
  } catch (error) {
    console.error('Exception fetching blog post:', error);
    // Try to find in mock data as fallback
    const mockPost = mockBlogPosts.find(post => post.slug === slug);
    return mockPost || null;
  }
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost | null> => {
  if (!isSupabaseConfigured) {
    console.warn('Cannot create blog post: Supabase not configured');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
    
    return data as BlogPost;
  } catch (error) {
    console.error('Exception creating blog post:', error);
    return null;
  }
};

// Update an existing blog post
export const updateBlogPost = async (id: number, post: Partial<BlogPost>): Promise<BlogPost | null> => {
  if (!isSupabaseConfigured) {
    console.warn('Cannot update blog post: Supabase not configured');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
    
    return data as BlogPost;
  } catch (error) {
    console.error('Exception updating blog post:', error);
    return null;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: number): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    console.warn('Cannot delete blog post: Supabase not configured');
    return false;
  }
  
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception deleting blog post:', error);
    return false;
  }
};
