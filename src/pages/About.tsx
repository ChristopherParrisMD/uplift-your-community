
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-mindful-50 to-calm-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Our Mission</h1>
                <p className="mt-6 text-xl text-gray-700">
                  My Insight Ally is dedicated to making mental health resources more accessible, eliminating stigma, and empowering individuals to take control of their mental well-being.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    alt="Team of mental health professionals collaborating" 
                    className="w-full h-full object-contain" 
                    src="/lovable-uploads/2093256e-3eac-487b-b829-d32e363ac083.jpg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <ValueCard title="Evidence-Based Approach" description="We are committed to providing information that is grounded in research and endorsed by mental health professionals." />
              <ValueCard title="Accessibility" description="We strive to make mental health resources available to everyone, regardless of their circumstances or background." />
              <ValueCard title="Compassion" description="We approach every interaction with empathy, understanding that each person's mental health journey is unique." />
              <ValueCard title="Empowerment" description="We believe in giving people the tools and knowledge they need to take an active role in their mental wellness." />
              <ValueCard title="Inclusivity" description="We recognize the diverse needs of different communities and work to create resources that are relevant and respectful to all." />
              <ValueCard title="Integrity" description="We maintain the highest standards of honesty, transparency, and ethical practice in everything we do." />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

// Helper Components
const ValueCard = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => <Card>
    <CardContent className="pt-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>;
export default About;
