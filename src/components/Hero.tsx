
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-pattern relative overflow-hidden bg-gradient-to-br from-mindful-50 to-calm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Journey to <span className="gradient-text bg-gradient-to-r from-mindful-600 to-calm-600 inline-block text-transparent bg-clip-text">Mental Wellness</span> Starts Here
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
              Connect with trusted therapists, explore helpful resources, and join a community that understands your mental health journey.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-mindful-600 hover:bg-mindful-700 rounded-full px-8">
                <Link to="/therapist-finder">Find a Therapist</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-mindful-600 text-mindful-600 hover:bg-mindful-50">
                <Link to="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-64 md:h-96 animate-float">
              <img
                src="https://images.unsplash.com/photo-1573497019703-b51911530f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="People supporting each other"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white rounded-2xl p-4 shadow-lg w-40 md:w-64">
                <div className="text-xs md:text-sm text-gray-500">Your wellness matters</div>
                <div className="font-semibold text-sm md:text-base mt-1">83% of people report feeling better after therapy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,197.3C672,181,768,139,864,128C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
