
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        
        {/* Resources Tabs Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="self-help" className="space-y-8">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="self-help">Self-Help Tools</TabsTrigger>
                <TabsTrigger value="crisis">Crisis Resources</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="support">Support Others</TabsTrigger>
              </TabsList>
              
              <TabsContent value="self-help" className="space-y-8">
                <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Self-Help Tools</h2>
                  <p className="text-gray-600 mb-8">
                    These evidence-based resources can help you develop skills to manage your mental health. While they're not substitutes for professional care, they can be valuable additions to your wellness toolkit.
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <ResourceCard
                      title="Anxiety Management Techniques"
                      description="Learn practical skills to manage anxiety symptoms, including breathing exercises, progressive muscle relaxation, and cognitive reframing."
                      icon={<AnxietyIcon />}
                    />
                    <ResourceCard
                      title="Mindfulness Practice Guide"
                      description="A beginner-friendly introduction to mindfulness meditation with guided audio practices ranging from 5-30 minutes."
                      icon={<MindfulnessIcon />}
                    />
                    <ResourceCard
                      title="Sleep Improvement Workbook"
                      description="Develop better sleep habits with this interactive workbook based on cognitive behavioral therapy for insomnia (CBT-I)."
                      icon={<SleepIcon />}
                    />
                    <ResourceCard
                      title="Mood Tracking Journal"
                      description="A digital journal to track your mood patterns, identify triggers, and develop coping strategies for emotional regulation."
                      icon={<MoodIcon />}
                    />
                    <ResourceCard
                      title="Stress Management Guide"
                      description="Practical techniques for managing stress in daily life, including time management, boundary setting, and self-care practices."
                      icon={<StressIcon />}
                    />
                    <ResourceCard
                      title="Positive Psychology Exercises"
                      description="Science-based exercises to build resilience, increase positive emotions, and enhance your overall well-being."
                      icon={<PositivityIcon />}
                    />
                  </div>
                </div>
                
                <div className="p-8 bg-mindful-50 rounded-lg border border-mindful-100">
                  <h3 className="text-xl font-semibold mb-2">Popular Mental Health Apps</h3>
                  <p className="text-gray-600 mb-6">
                    These mobile applications can help you practice mindfulness, track your mood, and develop coping skills.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AppCard
                      name="Calm"
                      category="Meditation & Sleep"
                      rating="4.8/5"
                    />
                    <AppCard
                      name="Headspace"
                      category="Guided Meditation"
                      rating="4.9/5"
                    />
                    <AppCard
                      name="Woebot"
                      category="AI Therapy Chat"
                      rating="4.7/5"
                    />
                    <AppCard
                      name="Daylio"
                      category="Mood Tracking"
                      rating="4.8/5"
                    />
                    <AppCard
                      name="Youper"
                      category="AI Emotional Health"
                      rating="4.7/5"
                    />
                    <AppCard
                      name="Insight Timer"
                      category="Free Meditation"
                      rating="4.9/5"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="crisis" className="space-y-8">
                <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
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
              </TabsContent>
              
              <TabsContent value="education" className="space-y-8">
                <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Mental Health Education</h2>
                  <p className="text-gray-600 mb-8">
                    Understand mental health conditions, treatment options, and the science behind psychological well-being through these educational resources.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Mental Health Conditions</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EducationCard
                          title="Understanding Depression"
                          type="Guide"
                          description="Learn about symptoms, causes, and treatment options for depression."
                        />
                        <EducationCard
                          title="Anxiety Disorders Explained"
                          type="Guide"
                          description="An overview of different types of anxiety disorders and their management."
                        />
                        <EducationCard
                          title="PTSD: Causes and Recovery"
                          type="Guide"
                          description="Understanding trauma responses and effective treatments for PTSD."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Treatment Approaches</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EducationCard
                          title="Types of Therapy"
                          type="Interactive Guide"
                          description="Explore different therapeutic approaches and how they work."
                        />
                        <EducationCard
                          title="Medication for Mental Health"
                          type="Guide"
                          description="Information about common psychiatric medications and their effects."
                        />
                        <EducationCard
                          title="Holistic Approaches"
                          type="Video Series"
                          description="Complementary practices that can support mental well-being."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Science of Mental Health</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <EducationCard
                          title="The Brain and Mental Health"
                          type="Interactive Tutorial"
                          description="How brain chemistry and structure influence mental health."
                        />
                        <EducationCard
                          title="Genetics and Environment"
                          type="Article"
                          description="Understanding how genes and life experiences shape mental health."
                        />
                        <EducationCard
                          title="Latest Research Findings"
                          type="Research Summaries"
                          description="Current studies in mental health explained in accessible language."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-8">
                <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Supporting Others</h2>
                  <p className="text-gray-600 mb-8">
                    Learn how to effectively support friends, family members, or colleagues who may be struggling with their mental health.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">How to Have Supportive Conversations</h3>
                      <div className="bg-calm-50 rounded-lg p-6">
                        <ol className="space-y-4 text-gray-700">
                          <li className="flex">
                            <span className="font-bold mr-2">1.</span>
                            <div>
                              <p className="font-medium">Choose the right time and place</p>
                              <p className="text-sm mt-1">Find a quiet, private setting where the person will feel comfortable and there's enough time to talk.</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="font-bold mr-2">2.</span>
                            <div>
                              <p className="font-medium">Start with open-ended questions</p>
                              <p className="text-sm mt-1">Ask questions like "How have you been feeling lately?" rather than yes/no questions.</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="font-bold mr-2">3.</span>
                            <div>
                              <p className="font-medium">Listen actively without judgment</p>
                              <p className="text-sm mt-1">Give your full attention, maintain eye contact, and avoid interrupting or offering quick solutions.</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="font-bold mr-2">4.</span>
                            <div>
                              <p className="font-medium">Validate their feelings</p>
                              <p className="text-sm mt-1">Say things like "That sounds really difficult" or "It makes sense you'd feel that way."</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="font-bold mr-2">5.</span>
                            <div>
                              <p className="font-medium">Avoid giving unsolicited advice</p>
                              <p className="text-sm mt-1">Instead of telling them what to do, ask "How can I support you right now?"</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Supporting Different People in Your Life</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <SupportCard 
                          title="Supporting a Partner"
                          description="How to balance being supportive while maintaining healthy relationship boundaries."
                        />
                        <SupportCard 
                          title="Helping a Friend"
                          description="Ways to show up for friends experiencing mental health challenges."
                        />
                        <SupportCard 
                          title="Supporting a Child or Teen"
                          description="Age-appropriate ways to discuss mental health and get help for young people."
                        />
                        <SupportCard 
                          title="Workplace Mental Health"
                          description="Creating supportive environments and helping colleagues in distress."
                        />
                        <SupportCard 
                          title="Supporting Older Adults"
                          description="Understanding the unique mental health needs of aging populations."
                        />
                        <SupportCard 
                          title="Self-Care for Caregivers"
                          description="How to maintain your own well-being while supporting others."
                        />
                      </div>
                    </div>
                    
                    <div className="bg-mindful-50 p-6 rounded-lg border border-mindful-100">
                      <h3 className="text-xl font-semibold mb-4">Mental Health First Aid Training</h3>
                      <p className="text-gray-700 mb-4">
                        Mental Health First Aid is a skills-based training that teaches people how to identify, understand, and respond to signs and symptoms of mental health and substance use challenges.
                      </p>
                      <Button asChild className="bg-mindful-600 hover:bg-mindful-700">
                        <Link to="/mental-health-first-aid">
                          Learn About Training Options
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const ResourceCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <Card className="card-hover h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="bg-mindful-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      <Button variant="outline" size="sm" className="w-full">View Resource</Button>
    </CardContent>
  </Card>
);

const CrisisResource = ({ name, number, description }: { name: string; number: string; description: string }) => (
  <div className="border rounded-lg p-6 bg-white shadow-sm">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-bold text-xl">{name}</h3>
        <div className="mt-2 text-xl font-semibold text-mindful-700">{number}</div>
        <p className="mt-2 text-gray-600 max-w-2xl">{description}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button className="bg-green-600 hover:bg-green-700">
          <a href={`tel:${number.replace(/\D/g, '')}`}>Call Now</a>
        </Button>
      </div>
    </div>
  </div>
);

const AppCard = ({ name, category, rating }: { name: string; category: string; rating: string }) => (
  <div className="bg-white rounded-lg border p-4 flex items-center">
    <div className="bg-gradient-to-br from-mindful-100 to-mindful-200 w-12 h-12 rounded-lg flex items-center justify-center">
      <span className="font-bold text-mindful-600">{name.substring(0, 1)}</span>
    </div>
    <div className="ml-4">
      <h4 className="font-medium">{name}</h4>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{category}</span>
        <span className="ml-2">⭐ {rating}</span>
      </div>
    </div>
  </div>
);

const EducationCard = ({ title, type, description }: { title: string; type: string; description: string }) => (
  <div className="border rounded-lg p-5 bg-white shadow-sm hover:shadow transition-shadow">
    <div className="text-xs font-medium text-mindful-600 mb-2">{type}</div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <Button variant="outline" size="sm">Read More</Button>
  </div>
);

const SupportCard = ({ title, description }: { title: string; description: string }) => (
  <div className="border rounded-lg p-5 bg-white shadow-sm hover:border-mindful-300 transition-colors">
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    <Button variant="link" className="text-mindful-700 p-0">Read Guide →</Button>
  </div>
);

// Icons
const AnxietyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MindfulnessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SleepIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MoodIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PositivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindful-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default Resources;
