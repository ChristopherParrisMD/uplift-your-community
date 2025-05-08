
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold">Mental Health Resources</h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Access expert-curated tools and information to support your mental health journey, whether you're seeking help or learning how to support others.
              </p>
            </div>
          </div>
        </section>
        
        {/* Crisis Resources Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-lg p-6 md:p-8 mb-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      If you or someone you know is in immediate danger, call 911 or go to your nearest emergency room.
                    </h3>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Crisis Resources</h2>
              <p className="text-gray-600 mb-8">
                These resources are available 24/7 to provide support during mental health crises. All services are confidential and staffed by trained professionals.
              </p>
              
              <div className="space-y-6">
                <CrisisResource
                  name="988 Suicide & Crisis Lifeline"
                  number="988"
                  description="Call or text 988 to connect with trained counselors who provide support for people in distress and prevention and crisis resources."
                />
                <CrisisResource
                  name="Crisis Text Line"
                  number="Text HOME to 741741"
                  description="Text-based support from trained crisis counselors for any type of crisis, available 24/7."
                />
                <CrisisResource
                  name="Veterans Crisis Line"
                  number="988, then press 1"
                  description="Connects veterans and their families with qualified responders through a confidential toll-free hotline."
                />
                <CrisisResource
                  name="Trevor Project (LGBTQ+ Youth)"
                  number="1-866-488-7386"
                  description="Crisis intervention and suicide prevention for LGBTQ+ young people under 25."
                />
                <CrisisResource
                  name="SAMHSA's National Helpline"
                  number="1-800-662-HELP (4357)"
                  description="Treatment referral and information service for individuals facing mental health or substance use disorders."
                />
              </div>
            </div>
            
            {/* Self-Help Books Section */}
            <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Recommended Self-Help Books</h2>
              <p className="text-gray-600 mb-8">
                Evidence-based reading recommendations from mental health professionals.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <BookCard 
                  title="The Body Keeps the Score" 
                  author="Bessel van der Kolk"
                  topic="Trauma Recovery"
                />
                <BookCard 
                  title="Feeling Good" 
                  author="David D. Burns"
                  topic="Depression & Anxiety"
                />
                <BookCard 
                  title="Atomic Habits" 
                  author="James Clear"
                  topic="Habit Formation"
                />
                <BookCard 
                  title="Self-Compassion" 
                  author="Kristin Neff"
                  topic="Self-Acceptance"
                />
                <BookCard 
                  title="The Gifts of Imperfection" 
                  author="Brené Brown"
                  topic="Authenticity & Self-Worth"
                />
                <BookCard 
                  title="Why We Sleep" 
                  author="Matthew Walker"
                  topic="Sleep Science"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Sign-up */}
        <section className="py-12 bg-mindful-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Receive monthly mental health resources, tips, and insights directly in your inbox.
            </p>
            <Button asChild className="bg-mindful-600 hover:bg-mindful-700">
              <Link to="/signup">Subscribe Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const CrisisResource = ({ name, number, description }: { name: string; number: string; description: string }) => (
  <div className="border rounded-lg p-5 bg-white shadow-sm hover:border-mindful-300 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
      </div>
      <div className="bg-mindful-50 px-4 py-2 rounded-full text-mindful-700 font-medium">
        {number}
      </div>
    </div>
  </div>
);

const BookCard = ({ title, author, topic }: { title: string; author: string; topic: string }) => (
  <div className="border rounded-lg p-5 bg-white shadow-sm hover:border-mindful-300 transition-colors">
    <div className="bg-mindful-50 text-mindful-700 text-xs font-medium px-2 py-1 rounded-full inline-block mb-3">
      {topic}
    </div>
    <h4 className="font-bold mb-1">{title}</h4>
    <p className="text-gray-500 text-sm mb-3">by {author}</p>
    <Button variant="link" className="text-mindful-700 p-0">Learn More →</Button>
  </div>
);

export default Resources;
