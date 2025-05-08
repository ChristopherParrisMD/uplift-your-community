
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const MentalHealthFirstAid = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-mindful-50 to-calm-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Mental Health <span className="gradient-text">First Aid</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Learn essential skills to recognize and respond to signs of mental health challenges and substance use issues.
              </p>
            </div>
          </div>
        </section>
        
        {/* What is Mental Health First Aid Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold">What is Mental Health First Aid?</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Mental Health First Aid is a skills-based training that teaches people how to identify, understand, and respond 
                  to signs and symptoms of mental health and substance use challenges in their communities.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  Just like traditional first aid, Mental Health First Aid equips you with the knowledge and confidence to provide 
                  initial support until appropriate professional help is available or until the crisis resolves.
                </p>
                <div className="mt-8">
                  <Button asChild className="bg-mindful-600 hover:bg-mindful-700 rounded-full px-8">
                    <Link to="/resources">Learn More About Training</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573497019236-61d12bc4a0c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Mental Health First Aid Training Session"
                  className="rounded-xl shadow-lg w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Components Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Key Components of Mental Health First Aid</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                The Mental Health First Aid Action Plan consists of five steps to help someone experiencing a mental health challenge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-mindful-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-mindful-600 font-bold text-xl">A</div>
                <h3 className="text-xl font-bold mb-3">Assess for risk</h3>
                <p className="text-gray-600">Learn to recognize warning signs and evaluate if someone is at risk of suicide or harm.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-mindful-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-mindful-600 font-bold text-xl">L</div>
                <h3 className="text-xl font-bold mb-3">Listen non-judgmentally</h3>
                <p className="text-gray-600">Create a safe space for open conversation without judgment or interruption.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-mindful-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-mindful-600 font-bold text-xl">G</div>
                <h3 className="text-xl font-bold mb-3">Give reassurance</h3>
                <p className="text-gray-600">Provide emotional support and information about resources available.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-mindful-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-mindful-600 font-bold text-xl">E</div>
                <h3 className="text-xl font-bold mb-3">Encourage professional help</h3>
                <p className="text-gray-600">Guide the person toward appropriate professional support services.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-mindful-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-mindful-600 font-bold text-xl">E</div>
                <h3 className="text-xl font-bold mb-3">Encourage self-help</h3>
                <p className="text-gray-600">Suggest strategies and resources for self-care and recovery support.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-mindful-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Become a Mental Health First Aider</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto text-mindful-100">
              Join thousands of people who are trained to recognize and respond to mental health challenges.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-mindful-700 hover:bg-gray-100 rounded-full px-8">
                <Link to="/resources">Find Training Near You</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentalHealthFirstAid;
