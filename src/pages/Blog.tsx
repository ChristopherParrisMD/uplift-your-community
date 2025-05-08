
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog data
const allPosts = [
  {
    id: 1,
    title: "Understanding Anxiety: Symptoms, Causes and Treatment Options",
    excerpt: "Anxiety disorders affect millions of people. Learn about common symptoms and evidence-based treatments that can help manage anxiety effectively.",
    author: {
      name: "Dr. Jessica Chen",
      role: "Clinical Psychologist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "May 4, 2025",
    readTime: "6 min read",
    category: "Anxiety",
    image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "The Science Behind Mindfulness Meditation",
    excerpt: "Research shows that regular mindfulness practice can reduce stress and improve mental clarity. We explore how it works in the brain.",
    author: {
      name: "Dr. Robert Williams",
      role: "Neuroscientist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 28, 2025",
    readTime: "8 min read",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Breaking the Stigma: Why Mental Health Matters",
    excerpt: "Mental health stigma prevents many from seeking help. Learn how to recognize stigma and be part of the solution in your community.",
    author: {
      name: "Maya Thompson",
      role: "Mental Health Advocate",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 21, 2025",
    readTime: "5 min read",
    category: "Advocacy",
    image: "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Depression in Youth: Warning Signs and How to Help",
    excerpt: "Teenage depression is on the rise. Learn how to identify warning signs and provide support to young people who may be struggling.",
    author: {
      name: "Dr. Amanda Lee",
      role: "Child Psychologist",
      avatar: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 14, 2025",
    readTime: "7 min read",
    category: "Depression",
    image: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "5 Evidence-Based Ways to Boost Your Mental Resilience",
    excerpt: "Resilience isn't just something you're born with—it can be developed. Discover science-backed strategies to strengthen your psychological resilience.",
    author: {
      name: "Dr. Sophia Patel",
      role: "Positive Psychology Researcher",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Apr 7, 2025",
    readTime: "6 min read",
    category: "Self-Care",
    image: "https://images.unsplash.com/photo-1562104037-e331486b7701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Navigating Grief: A Compass for the Journey",
    excerpt: "Grief is a universal human experience, yet everyone's journey is unique. Learn healthy ways to process loss and find meaning again.",
    author: {
      name: "Dr. Marcus Bennett",
      role: "Grief Counselor",
      avatar: "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: "Mar 31, 2025",
    readTime: "9 min read",
    category: "Grief",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Mindfulness",
  "Self-Care",
  "Relationships",
  "Grief",
  "Trauma",
  "Advocacy",
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter posts based on search query and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
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
                Research-backed articles, expert interviews, and personal stories to support your mental well-being journey.
              </p>
              
              <div className="mt-10">
                <div className="relative max-w-xl mx-auto">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-3 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
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
                  Try adjusting your search or filter to find what you're looking for.
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
                Join our newsletter for the latest articles, resources, and expert tips delivered to your inbox.
              </p>
              
              <form className="mt-8 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <Input type="email" placeholder="Your email address" className="w-full" required />
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
