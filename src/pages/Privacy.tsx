
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last Updated: May 8, 2025</p>
            
            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Introduction</h2>
                <p>
                  My Insight Ally ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to it (collectively, the "Site").
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us when you register on our Site, subscribe to our newsletter, fill out a form, or otherwise communicate with us.
                </p>
                <h3 className="text-lg font-medium mt-4 mb-2">Personal Information</h3>
                <p>
                  We may collect the following personal information:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Name</li>
                  <li>Email address</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
                <p>
                  We may also collect information about how the Site is accessed and used ("Usage Data"). This may include:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Your computer's Internet Protocol address (IP address)</li>
                  <li>Browser type and version</li>
                  <li>Pages of our Site that you visit</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on those pages</li>
                  <li>Other diagnostic data</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Cookies and Tracking Technology</h3>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
                <p>We may use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Provide, operate, and maintain our Site</li>
                  <li>Improve, personalize, and expand our Site</li>
                  <li>Understand and analyze how you use our Site</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you, including for customer service, to provide updates and other information relating to the Site, and for marketing and promotional purposes</li>
                  <li>Process transactions</li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Disclosure of Your Information</h2>
                <p>We may share information we have collected about you in certain situations. We may disclose your information:</p>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Compliance with Laws</h3>
                <p>
                  We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
                </p>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Business Transfers</h3>
                <p>
                  We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </p>
                
                <h3 className="text-lg font-medium mt-4 mb-2">With Your Consent</h3>
                <p>
                  We may disclose your personal information for any other purpose with your consent.
                </p>
                
                <h3 className="text-lg font-medium mt-4 mb-2">Third-Party Service Providers</h3>
                <p>
                  We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Security of Your Information</h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Your Choices About Your Information</h2>
                <p>
                  You can review, update, or delete your account information by contacting us. You can also opt out of receiving emails from us by following the unsubscribe instructions included in each email.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
                <p>
                  Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, please do not provide any information on this Site.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
