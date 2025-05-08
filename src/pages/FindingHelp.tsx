
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom"; // Added Link import

const FindingHelp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold">Finding the Right Mental Health Provider</h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Choosing the right mental health professional is an important step on your wellness journey. Here's guidance to help you make an informed decision.
              </p>
            </div>
            
            <Tabs defaultValue="types" className="mt-12">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="types">Types of Providers</TabsTrigger>
                <TabsTrigger value="choosing">How to Choose</TabsTrigger>
                <TabsTrigger value="questions">Questions to Ask</TabsTrigger>
              </TabsList>
              
              <TabsContent value="types">
                <div className="grid md:grid-cols-2 gap-6">
                  <ProviderCard 
                    title="Psychiatrist" 
                    description="Medical doctors who can diagnose mental health conditions, prescribe medication, and provide therapy. They specialize in mental health care and have completed medical school with additional psychiatric training."
                    education="MD or DO with psychiatric residency"
                    bestFor="Complex conditions requiring medication management, diagnosis of mental disorders, treatment-resistant conditions"
                  />
                  
                  <ProviderCard 
                    title="Psychologist" 
                    description="Specialists trained to evaluate and diagnose mental health issues through testing and therapy. They cannot prescribe medication in most states but provide various forms of psychotherapy."
                    education="PhD, PsyD, or EdD in psychology"
                    bestFor="Psychological testing and evaluation, evidence-based therapy, complex behavioral issues"
                  />
                  
                  <ProviderCard 
                    title="Licensed Professional Counselor (LPC)" 
                    description="Mental health professionals trained to provide counseling and psychotherapy to help people with emotional and mental health issues."
                    education="Master's degree in counseling or related field"
                    bestFor="Individual, family, or group therapy, career counseling, life transitions"
                  />
                  
                  <ProviderCard 
                    title="Licensed Clinical Social Worker (LCSW)" 
                    description="Social workers with specialized training in mental health who provide therapy and help connect clients with community resources and support services."
                    education="Master's degree in social work"
                    bestFor="Therapy combined with case management, connecting to community services, family systems issues"
                  />
                  
                  <ProviderCard 
                    title="Marriage and Family Therapist" 
                    description="Professionals who focus on treating mental and emotional disorders within the context of marriage, couples and family systems."
                    education="Master's or doctoral degree in marriage and family therapy"
                    bestFor="Relationship issues, family dynamics, couples therapy, parenting challenges"
                  />
                  
                  <ProviderCard 
                    title="Psychiatric Nurse Practitioner" 
                    description="Advanced practice registered nurses who specialize in mental health care and can diagnose conditions and prescribe medication in most states."
                    education="Master's or doctoral degree in nursing with psychiatric specialization"
                    bestFor="Medication management, ongoing mental health care, integrated health approaches"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="choosing">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Factors to Consider When Choosing a Provider</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li><strong>Specialization:</strong> Look for providers who have experience treating your specific concerns (anxiety, depression, trauma, etc.).</li>
                          <li><strong>Therapeutic approach:</strong> Different providers use different techniques (CBT, psychodynamic, mindfulness-based). Research which approaches might work best for your situation.</li>
                          <li><strong>Credentials and experience:</strong> Verify that the provider is licensed and has appropriate training and experience.</li>
                          <li><strong>Logistical factors:</strong> Consider location, availability, cost, and insurance coverage.</li>
                          <li><strong>Personal comfort:</strong> The therapeutic relationship is important, so you should feel comfortable with your provider.</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Finding Providers in Your Area</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li><strong>Insurance provider directory:</strong> Check with your insurance company for in-network providers.</li>
                          <li><strong>Professional associations:</strong> Organizations like the American Psychological Association or American Psychiatric Association have provider directories.</li>
                          <li><strong>Primary care referral:</strong> Your primary doctor can often provide referrals to mental health specialists.</li>
                          <li><strong>University medical centers:</strong> Many offer mental health services or can refer you to specialists.</li>
                          <li><strong>Community mental health centers:</strong> These provide services at reduced costs based on income.</li>
                          <li><strong>Online therapy directories:</strong> Websites like Psychology Today, GoodTherapy, or TherapyDen allow you to search for providers by location, specialty, and insurance.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-mindful-50 p-5 rounded-lg border border-mindful-100">
                        <h4 className="font-semibold text-mindful-700 mb-2">Important Reminder</h4>
                        <p className="text-gray-700">It's okay to meet with several providers before deciding who is the best fit for you. Most mental health professionals expect and encourage this process. The relationship between you and your provider is one of the most important factors in successful treatment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Questions to Ask Potential Providers</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">About Their Background & Experience</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>What is your experience treating people with my specific concerns?</li>
                              <li>What are your areas of specialization?</li>
                              <li>How long have you been practicing?</li>
                              <li>What licenses and certifications do you hold?</li>
                              <li>What is your approach to treatment?</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">About the Therapeutic Process</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>How frequently would we meet and for how long?</li>
                              <li>How do you measure progress in therapy?</li>
                              <li>What might treatment look like for my specific situation?</li>
                              <li>Do you assign "homework" between sessions?</li>
                              <li>How long might therapy take for someone with my concerns?</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">About Practical Matters</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>What are your fees? Do you offer a sliding scale?</li>
                              <li>Do you accept my insurance?</li>
                              <li>What is your cancellation policy?</li>
                              <li>Are you available between sessions in case of emergency?</li>
                              <li>Do you offer telehealth services?</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">Red Flags to Watch For</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>Promising unrealistic results or "quick fixes"</li>
                              <li>Unwillingness to discuss fees or policies clearly</li>
                              <li>Being evasive about qualifications or experience</li>
                              <li>Poor boundaries (personal disclosures, inappropriate comments)</li>
                              <li>Pressuring you to commit to a specific treatment plan immediately</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-mindful-50 p-5 rounded-lg border border-mindful-100">
                        <h4 className="font-semibold text-mindful-700 mb-2">Trust Your Instincts</h4>
                        <p className="text-gray-700">Pay attention to how you feel during your initial consultation. Do you feel heard and respected? Does the provider explain things in a way you understand? The therapeutic relationship is a partnership, and feeling comfortable with your provider is essential for effective treatment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper components
const ProviderCard = ({ title, description, education, bestFor }: { 
  title: string; 
  description: string; 
  education: string; 
  bestFor: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="space-y-2 mt-4">
        <div>
          <span className="text-sm font-medium text-mindful-700">Education:</span>
          <span className="text-sm text-gray-600 ml-2">{education}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-mindful-700">Best for:</span>
          <span className="text-sm text-gray-600 ml-2">{bestFor}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResourceCard = ({ title, description, link }: { 
  title: string; 
  description: string; 
  link: string;
}) => (
  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-mindful-300 transition-colors">
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <Link to={link} className="text-mindful-600 hover:text-mindful-800 text-sm font-medium">
      Learn more →
    </Link>
  </div>
);

export default FindingHelp;
