
import { supabase } from "@/integrations/supabase/client";

// Upload an image to Supabase Storage
export const uploadBlogImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
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
