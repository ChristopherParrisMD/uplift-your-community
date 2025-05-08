
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPostProps;
  className?: string;
  variant?: "default" | "featured";
}

const BlogCard = ({ post, className, variant = "default" }: BlogCardProps) => {
  const isFeatured = variant === "featured";
  
  return (
    <Card className={cn(
      "overflow-hidden card-hover group h-full",
      isFeatured ? "md:col-span-2" : "",
      className
    )}>
      <div className={cn(
        "flex flex-col",
        isFeatured ? "md:flex-row" : ""
      )}>
        <div className={cn(
          "relative",
          isFeatured ? "md:w-1/2" : ""
        )}>
          <Link to={`/blog/${post.id}`}>
            <img 
              src={post.image} 
              alt={post.title} 
              className={cn(
                "w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105",
                isFeatured ? "md:h-full" : ""
              )}
            />
          </Link>
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-white/90 text-gray-800 hover:bg-white"
          >
            {post.category}
          </Badge>
        </div>
        
        <div className={cn(
          "flex flex-col flex-grow",
          isFeatured ? "md:w-1/2" : ""
        )}>
          <CardContent className="p-6 flex-grow">
            <div className="flex items-center space-x-2 mb-3 text-sm">
              <span className="text-mindful-600">{post.publishDate}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{post.readTime}</span>
            </div>
          
            <Link to={`/blog/${post.id}`} className="group">
              <h3 className={cn(
                "font-bold group-hover:text-mindful-600 transition-colors",
                isFeatured ? "text-2xl mb-3" : "text-xl mb-2"
              )}>
                {post.title}
              </h3>
            </Link>
            
            <p className={cn(
              "text-gray-600",
              isFeatured ? "text-base" : "text-sm"
            )}>
              {post.excerpt}
            </p>
          </CardContent>
          
          <CardFooter className="px-6 pb-6 pt-0 flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.author.role}</p>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
