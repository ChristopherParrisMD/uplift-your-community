
import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import OnlineProviderSearch from "@/components/provider/OnlineProviderSearch";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Star, Users } from "lucide-react";

const FindProvider: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Find Online Therapy Provider | My Insight Ally</title>
        <meta
          name="description"
          content="Search for online therapy providers from online-therapy.com. Connect with qualified therapists who can help you from the comfort of your home."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Find an Online Therapy Provider</h1>
              <p className="text-gray-600 max-w-3xl">
                Connect with qualified online therapy providers who can help you from the comfort of your home.
                Use the search tools below to find the right match for your needs.
              </p>
            </div>
            
            <OnlineProviderSearch />
            
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <Card className="bg-white border shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Why Choose Online Therapy?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle className="h-5 w-5 text-mindful-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Convenient Access</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Connect with your therapist from anywhere with an internet connection. No need to commute or take time off work.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Clock className="h-5 w-5 text-mindful-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Flexible Scheduling</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Many online providers offer evening and weekend appointments to fit your busy schedule and accommodate your needs.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Users className="h-5 w-5 text-mindful-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Comfort and Privacy</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Attend therapy sessions from the comfort and privacy of your own space, creating a safe environment for healing.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">How Online Therapy Works</h2>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-mindful-100 text-mindful-800 font-medium text-sm">1</div>
                      <div>
                        <h3 className="font-medium">Search for Providers</h3>
                        <p className="text-sm text-gray-600 mt-1">Browse therapists based on your location, specialty needs, and insurance coverage.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-mindful-100 text-mindful-800 font-medium text-sm">2</div>
                      <div>
                        <h3 className="font-medium">Create an Account</h3>
                        <p className="text-sm text-gray-600 mt-1">Sign up with online-therapy.com to connect with your chosen provider and schedule a consultation.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-mindful-100 text-mindful-800 font-medium text-sm">3</div>
                      <div>
                        <h3 className="font-medium">Schedule Your Session</h3>
                        <p className="text-sm text-gray-600 mt-1">Choose a convenient time for your first video consultation and start your therapy journey.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-mindful-100 text-mindful-800 font-medium text-sm">4</div>
                      <div>
                        <h3 className="font-medium">Begin Therapy</h3>
                        <p className="text-sm text-gray-600 mt-1">Connect via secure video platform for your sessions and access resources between appointments.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 bg-mindful-50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <Star className="h-12 w-12 text-mindful-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Highly Rated Providers</h2>
                  <p className="text-gray-700">
                    All providers on our platform are licensed professionals with verified credentials.
                    We partner with online-therapy.com to ensure you receive quality mental health care
                    from experienced therapists who specialize in various areas of treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FindProvider;
