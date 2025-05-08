
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/services/blogService";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { 
    data: post, 
    isLoading,
    error
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => getBlogPostBySlug(slug || ''),
    enabled: !!slug
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-white">
        {/* Back button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/blog">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center gap-2 mb-8">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-96 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Article not found</h2>
              <p className="mt-2 text-gray-600">
                We couldn't find the article you're looking for.
              </p>
              <Link to="/blog" className="mt-6 inline-block">
                <Button>Return to Blog</Button>
              </Link>
            </div>
          </div>
        ) : post ? (
          <>
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={post.author_avatar} 
                  alt={post.author_name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1518799175676-a0fed7996acb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
                  }}
                />
                <div>
                  <p className="font-medium">{post.author_name}</p>
                  <p className="text-sm text-gray-600">{post.publish_date} · {post.read_time}</p>
                </div>
              </div>
              
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              )}
              
              <div 
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="flex items-center gap-2 mt-10 pt-6 border-t">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </article>
            
            {/* Related articles section could go here */}
          </>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
