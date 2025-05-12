
import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import OnlineProviderSearch from "@/components/provider/OnlineProviderSearch";

const FindProvider: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Find Online Therapy Provider | My Insight Ally</title>
        <meta
          name="description"
          content="Search for online therapy providers from online-therapy.com."
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
            
            <div className="mt-12 bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Why Choose Online Therapy?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Convenient Access</h3>
                  <p className="text-sm text-gray-600">Connect with your therapist from anywhere with an internet connection. No commuting needed.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600">Many online providers offer evening and weekend appointments to fit your busy life.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Comfort and Privacy</h3>
                  <p className="text-sm text-gray-600">Attend sessions from the comfort and privacy of your own space.</p>
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
