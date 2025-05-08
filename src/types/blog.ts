
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  publish_date: string;
  read_time: string;
  category: string;
  image_url: string;
  featured?: boolean;
  slug: string;
  created_at?: string;
}

export type BlogCategory = "All" | "Research" | "Treatment" | "Technology" | "Connection" | "Accessibility";
