
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Contact Us</h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Our team is here to help.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <ContactCard 
                  icon={<Mail className="h-6 w-6 text-mindful-600" />}
                  title="Email Us"
                  content="support@myinsightally.com"
                  description="For general inquiries and support"
                />
                
                <ContactCard 
                  icon={<Phone className="h-6 w-6 text-mindful-600" />}
                  title="Call Us"
                  content="(555) 123-4567"
                  description="Mon-Fri, 9:00 AM - 5:00 PM EST"
                />
                
                <ContactCard 
                  icon={<MapPin className="h-6 w-6 text-mindful-600" />}
                  title="Visit Us"
                  content="123 Wellness Avenue, Suite 200, Springfield, IL 62701"
                  description="By appointment only"
                />
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                  
                  <div className="grid gap-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[150px]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-mindful-600 hover:bg-mindful-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-6">
                    By submitting this form, you agree to our <a href="/privacy" className="text-mindful-600 hover:underline">Privacy Policy</a> and <a href="/terms" className="text-mindful-600 hover:underline">Terms of Service</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <FAQ 
                question="How quickly can I expect a response to my inquiry?" 
                answer="We strive to respond to all inquiries within 1-2 business days. For urgent matters, please call us directly."
              />
              <FAQ 
                question="Do you offer consulting services for organizations?" 
                answer="Yes, we provide mental health workshops, training, and consulting services for businesses, schools, and other organizations. Please contact us with details about your needs."
              />
              <FAQ 
                question="Can I request a specific resource or topic to be covered?" 
                answer="Absolutely! We're always looking to expand our resources based on community needs. Feel free to suggest topics you'd like to see covered."
              />
              <FAQ 
                question="Is my contact information kept confidential?" 
                answer="Yes, we take privacy very seriously. Your contact information is kept confidential and is only used to respond to your inquiries. See our Privacy Policy for more details."
              />
              <FAQ 
                question="How can I report a technical issue with the website?" 
                answer="Please use the contact form and select 'Technical Issue' as the subject. Provide details about the problem you encountered, including the device and browser you were using."
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const ContactCard = ({ icon, title, content, description }: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  description: string;
}) => (
  <Card>
    <CardContent className="flex items-start p-6">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-800">{content}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const FAQ = ({ question, answer }: { question: string; answer: string }) => (
  <div className="border-b border-gray-200 pb-6">
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default Contact;
