
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
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-mindful-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Wellness Journey?</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto text-mindful-100">
              Taking the first step toward better mental health is a sign of strength, not weakness.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
