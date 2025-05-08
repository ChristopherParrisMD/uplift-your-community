
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Updated blog data with real articles
const allPosts = [
  {
    id: 1,
    title: "Teens With Mental Health Conditions Use Social Media Differently Than Their Peers",
    excerpt: "This groundbreaking study is one of the first to use clinical-level diagnoses to reveal distinct differences in social media usage patterns between teens with mental health conditions and their peers.",
    author: {
      name: "ScienceDaily",
      role: "Research Publication",
      avatar: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "May 5, 2025",
    readTime: "8 min read",
    category: "Research",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "New Non-Invasive Brain Stimulation Technique Shows Significant Reduction in Depression, Anxiety and PTSD Symptoms",
    excerpt: "This research demonstrates how a novel sound wave therapy can directly target deep brain regions, offering significant reductions in symptoms of depression, anxiety, and PTSD.",
    author: {
      name: "ScienceDaily",
      role: "Research Publication",
      avatar: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 28, 2025",
    readTime: "10 min read",
    category: "Treatment",
    image: "https://images.unsplash.com/photo-1587573089734-599851b2c3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "How a Smartphone App Could Transform Mental Health Care",
    excerpt: "This article explores how smartphones, often considered sources of stress, could actually become powerful solutions for mental health treatment through innovative applications.",
    author: {
      name: "ScienceDaily",
      role: "Research Publication",
      avatar: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 23, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "What happens when people put their phones down and eat together?",
    excerpt: "This article examines the mental health benefits of \"Community Plate\" initiatives that bring people together over shared potluck suppers, promoting social connection.",
    author: {
      name: "NPR",
      role: "News Publication",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "May 7, 2025",
    readTime: "6 min read",
    category: "Connection",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Psychotherapy Becoming More Accessible",
    excerpt: "This study from the American Journal of Psychiatry suggests that more people are starting and staying with psychotherapy than in previous years, indicating improved accessibility to mental health treatment.",
    author: {
      name: "NPR",
      role: "News Publication",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "May 5, 2025",
    readTime: "5 min read",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const categories = [
  "All",
  "Research",
  "Treatment",
  "Technology",
  "Connection",
  "Accessibility",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter posts based on category only (removed search filtering)
  const filteredPosts = allPosts.filter(post => {
    return activeCategory === "All" || post.category === activeCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-white">
        {/* Hero Section - Removed search bar */}
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
              <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
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
            
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Load More Articles
                  </Button>
                </div>
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
