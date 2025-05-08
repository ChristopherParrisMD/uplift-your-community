
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactCard from "@/components/ContactCard";
import HeroSection from "@/components/HeroSection";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <HeroSection 
          title="Contact Us"
          description="Have questions or feedback? We'd love to hear from you. Our team is here to help."
        />
        
        {/* Contact Form Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info Card - Email Only */}
              <div>
                <ContactCard 
                  icon={<Mail className="h-6 w-6 text-mindful-600" />}
                  title="Email Us"
                  content="support@myinsightally.com"
                  description="For general inquiries and support"
                />
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
