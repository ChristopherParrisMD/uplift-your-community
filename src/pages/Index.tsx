
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Sample blog data
const featuredPosts = [
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
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: true
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">How We Can Help</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our mission is to make mental health care accessible, relatable, and effective for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<TherapistIcon />}
                title="Find the Right Therapist"
                description="Search our curated network of licensed mental health professionals who specialize in various areas of expertise."
                linkText="Find a therapist"
                linkUrl="/therapist-finder"
              />
              
              <ServiceCard 
                icon={<ResourceIcon />}
                title="Evidence-Based Resources"
                description="Access articles, tools, and guides written by mental health professionals to support your well-being."
                linkText="Explore resources"
                linkUrl="/resources"
              />
              
              <ServiceCard 
                icon={<CommunityIcon />}
                title="Supportive Community"
                description="Connect with others in moderated forums and support groups focused on specific mental health topics."
                linkText="Join our community"
                linkUrl="/community"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-mindful-50 to-calm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold">Find the Mental Health Support You Need</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Our therapist finder makes it easy to connect with qualified professionals who match your specific needs.
                </p>
                
                <ul className="mt-8 space-y-4">
                  <FeatureItem text="Search by specialization, insurance, or treatment approach" />
                  <FeatureItem text="Read verified reviews from real clients" />
                  <FeatureItem text="Filter by those accepting new patients" />
                  <FeatureItem text="See available appointment times" />
                </ul>
                
                <Button 
                  asChild 
                  className="mt-8 bg-mindful-600 hover:bg-mindful-700 rounded-full px-8"
                  size="lg"
                >
                  <Link to="/therapist-finder">
                    Find a Therapist
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-mindful-100 p-3 rounded-full">
                      <SearchIcon />
                    </div>
                    <h3 className="ml-4 text-xl font-medium">Therapist Search</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                          alt="Therapist" 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-gray-500">Anxiety Specialist • 1.2 miles away</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                          alt="Therapist" 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <p className="font-medium">Dr. Michael Chen</p>
                          <p className="text-sm text-gray-500">Trauma Specialist • 2.5 miles away</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                          alt="Therapist" 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <p className="font-medium">Dr. Emily Rodriguez</p>
                          <p className="text-sm text-gray-500">Relationship Counselor • 3.8 miles away</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-5 -right-5 bg-mindful-600 rounded-full p-6 shadow-lg hidden md:block">
                  <HeartIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <p className="mt-2 text-lg text-gray-600">
                  Expert insights and practical advice for your mental well-being
                </p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/blog">View All Articles</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant={index === 0 ? "featured" : "default"} 
                />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-mindful-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Wellness Journey?</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto text-mindful-100">
              Taking the first step toward better mental health is a sign of strength, not weakness.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-mindful-700 hover:bg-gray-100 rounded-full px-8">
                <Link to="/therapist-finder">Find a Therapist</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-mindful-700 rounded-full px-8">
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const ServiceCard = ({ icon, title, description, linkText, linkUrl }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  linkText: string;
  linkUrl: string;
}) => (
  <Card className="card-hover h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="bg-mindful-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link to={linkUrl} className="text-mindful-600 font-medium hover:text-mindful-800 inline-flex items-center">
        {linkText}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </CardContent>
  </Card>
);

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-calm-100 text-calm-600 flex items-center justify-center">
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="ml-3 text-gray-600">{text}</span>
  </li>
);

// Icons
const TherapistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mindful-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ResourceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mindful-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mindful-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default Index;
