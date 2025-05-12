
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TherapistSearch from "@/components/TherapistSearch"; 
import { useTherapistSearch } from "@/hooks/useTherapistSearch";

const FindProvider = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold">Find Your Ideal Provider</h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Connect with licensed mental health professionals who specialize in the areas where you need support.
              </p>
            </div>
            
            <div className="my-8">
              <TherapistSearch />
            </div>
            
            <div className="mt-16 bg-white rounded-lg border p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">How to Choose the Right Therapist</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4 text-gray-700">
                    Finding the right therapist is an important decision. Here are some factors to consider when making your choice:
                  </p>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">•</div>
                      <span><strong>Specialization:</strong> Look for therapists who have experience with your specific concerns.</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">•</div>
                      <span><strong>Approach:</strong> Different therapists use different techniques. Research approaches like CBT, psychodynamic therapy, or mindfulness-based therapies.</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">•</div>
                      <span><strong>Logistics:</strong> Consider practical factors like location, cost, insurance coverage, and availability.</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">•</div>
                      <span><strong>Connection:</strong> The therapeutic relationship is vital. It's okay to have initial consultations with multiple therapists.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-lg">Questions to ask potential therapists:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">1.</div>
                      <span>What experience do you have treating people with similar concerns?</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">2.</div>
                      <span>What therapeutic approaches do you typically use?</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">3.</div>
                      <span>How do you measure progress in therapy?</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">4.</div>
                      <span>What are your fees and do you accept my insurance?</span>
                    </li>
                    <li className="flex">
                      <div className="mr-2 text-mindful-600">5.</div>
                      <span>How often would we meet and for how long?</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindProvider;
