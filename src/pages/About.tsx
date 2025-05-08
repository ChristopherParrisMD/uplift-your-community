
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team of mental health professionals collaborating" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  My Insight Ally was founded in 2023 by a group of mental health professionals, technology experts, and individuals with lived experience of mental health challenges. Our founders recognized that despite growing awareness of mental health issues, many people still face significant barriers to accessing quality information and support.
                </p>
                <p>
                  What began as a small resource hub has grown into a comprehensive platform dedicated to mental health education, connection, and empowerment. We believe that everyone deserves access to mental health resources, regardless of their background, location, or financial situation.
                </p>
                <p>
                  Today, My Insight Ally serves thousands of visitors each month, providing evidence-based information, tools, and community support to help people navigate their mental health journeys with confidence and hope.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <ValueCard 
                title="Evidence-Based Approach" 
                description="We are committed to providing information that is grounded in research and endorsed by mental health professionals."
              />
              <ValueCard 
                title="Accessibility" 
                description="We strive to make mental health resources available to everyone, regardless of their circumstances or background."
              />
              <ValueCard 
                title="Compassion" 
                description="We approach every interaction with empathy, understanding that each person's mental health journey is unique."
              />
              <ValueCard 
                title="Empowerment" 
                description="We believe in giving people the tools and knowledge they need to take an active role in their mental wellness."
              />
              <ValueCard 
                title="Inclusivity" 
                description="We recognize the diverse needs of different communities and work to create resources that are relevant and respectful to all."
              />
              <ValueCard 
                title="Integrity" 
                description="We maintain the highest standards of honesty, transparency, and ethical practice in everything we do."
              />
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <TeamMember 
                name="Dr. Sarah Johnson" 
                title="Founder & Clinical Director"
                bio="Dr. Johnson is a licensed clinical psychologist with over 15 years of experience in mental health treatment and advocacy."
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
              <TeamMember 
                name="Michael Chen" 
                title="Chief Technology Officer"
                bio="Michael brings 10 years of experience in creating accessible digital platforms focused on healthcare and education."
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
              <TeamMember 
                name="Dr. Aisha Patel" 
                title="Content Director"
                bio="A psychiatrist specializing in cultural competence in mental health care and mental health education."
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
              <TeamMember 
                name="James Wilson" 
                title="Community Engagement Manager"
                bio="A mental health advocate with lived experience who focuses on creating supportive and inclusive communities."
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
              <TeamMember 
                name="Maria Rodriguez" 
                title="Educational Program Director"
                bio="A licensed therapist with a background in developing mental health curricula for diverse audiences."
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
              <TeamMember 
                name="Dr. David Kim" 
                title="Research Coordinator"
                bio="A research psychologist who ensures all our content is up-to-date with the latest scientific findings."
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
              />
            </div>
          </div>
        </section>
        
        {/* Our Partners Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
            
            <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              We collaborate with leading organizations in mental health, healthcare, education, and technology to expand our reach and impact.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
              <div className="h-20 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">Partner Logo</div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const ValueCard = ({ title, description }: { title: string; description: string }) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const TeamMember = ({ name, title, bio, image }: { name: string; title: string; bio: string; image: string }) => (
  <div className="text-center">
    <div className="mb-4 mx-auto rounded-full overflow-hidden w-32 h-32">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="text-mindful-600 font-medium mb-2">{title}</p>
    <p className="text-gray-600 text-sm">{bio}</p>
  </div>
);

export default About;
