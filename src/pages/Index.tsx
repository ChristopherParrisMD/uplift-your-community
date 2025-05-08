import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureItem } from "@/components/FeatureItem";
import { TherapistIcon, ResourceIcon, CommunityIcon, HeartIcon } from "@/components/icons";

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
                linkUrl="/signup"
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
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-4">Featured Therapists</h3>
                  
                  <div className="space-y-4">
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
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-mindful-700 rounded-full px-8 text-blue-400">
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

export default Index;
