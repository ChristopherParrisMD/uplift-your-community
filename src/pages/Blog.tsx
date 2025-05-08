
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts } from "@/services/blogService";
import { BlogPost, BlogCategory } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

const categories = [
  "All",
  "Research",
  "Treatment",
  "Technology",
  "Connection",
  "Accessibility",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  
  // Fetch blog posts using React Query
  const { 
    data: blogPosts = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
  });
  
  // Show error toast if fetching fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading blog posts",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }, [error]);
  
  // Filter posts based on category
  const filteredPosts = blogPosts.filter(post => {
    return activeCategory === "All" || post.category === activeCategory;
  });
  
  // Posts to display based on load more pagination
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  
  // Load more posts
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-mindful-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold">Mental Health Insights</h1>
              <p className="mt-6 text-xl text-gray-600">
                Research-backed articles, expert insights, and news on the latest developments in mental health care.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto pb-4 mb-8">
              <Tabs defaultValue="All" value={activeCategory} onValueChange={(value) => setActiveCategory(value as BlogCategory)} className="w-full">
                <TabsList className="inline-flex w-max space-x-1 p-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="px-4 py-2 rounded-full data-[state=active]:bg-mindful-600 data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3 rounded-lg border p-4">
                    <Skeleton className="h-60 w-full rounded-md" />
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                  </div>
                ))}
              </div>
            ) : displayedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedPosts.map((post) => (
                    <BlogCard key={post.id} post={{
                      id: post.id,
                      title: post.title,
                      excerpt: post.excerpt,
                      author: {
                        name: post.author_name,
                        role: post.author_role,
                        avatar: post.author_avatar
                      },
                      publishDate: post.publish_date,
                      readTime: post.read_time,
                      category: post.category,
                      image: post.image_url,
                      featured: post.featured,
                      slug: post.slug
                    }} />
                  ))}
                </div>
                
                {filteredPosts.length > visiblePosts && (
                  <div className="mt-12 flex justify-center">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={handleLoadMore}
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-600">
                  Try adjusting your filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-mindful-50 to-calm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold">Stay Updated on Mental Wellness</h2>
              <p className="mt-4 text-lg text-gray-600">
                Join our newsletter for the latest research, articles, and expert tips delivered to your inbox.
              </p>
              
              <form className="mt-8 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <input type="email" placeholder="Your email address" className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-10 flex" required />
                  </div>
                  <Button type="submit" className="bg-mindful-600 hover:bg-mindful-700">Subscribe</Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
