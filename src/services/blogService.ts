
import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('publish_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  
  return data as BlogPost;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost | null> => {
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
};

export const updateBlogPost = async (id: number, post: Partial<BlogPost>): Promise<BlogPost | null> => {
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
};

export const deleteBlogPost = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
  
  return true;
};
