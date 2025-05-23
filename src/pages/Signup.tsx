
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Save subscription to Supabase
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { name: formData.name, email: formData.email }
        ]);
        
      if (error) {
        // Handle duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email address is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          console.error("Error saving subscription:", error);
          toast({
            title: "Subscription failed",
            description: "There was an issue subscribing you to our newsletter. Please try again.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }

      // Success
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter. You'll receive monthly mental health resources, tips, and insights directly in your inbox.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an issue subscribing you to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10 md:py-20 bg-gradient-to-br from-mindful-50 to-calm-50">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Join Our Newsletter</h1>
            <p className="text-gray-600 mt-2">
              Receive monthly mental health resources, tips, and insights directly in your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <Button type="submit" className="w-full bg-mindful-600 hover:bg-mindful-700" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              By subscribing, you agree to our{" "}
              <Link to="/privacy" className="text-mindful-600 hover:text-mindful-800 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
