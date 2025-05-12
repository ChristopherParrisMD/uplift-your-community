
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ArrowRight } from "lucide-react";
import { OnlineTherapist } from "@/services/onlineTherapyService";
import { createAccount, initiateProviderContact } from "@/services/onlineTherapyService";
import { toast } from "@/components/ui/use-toast";

interface ConnectProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: OnlineTherapist;
}

const ConnectProviderModal: React.FC<ConnectProviderModalProps> = ({
  isOpen,
  onClose,
  provider
}) => {
  const [activeTab, setActiveTab] = useState<string>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || (activeTab === "signup" && (!firstName || !lastName || !password || !agreeTerms))) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (activeTab === "signup") {
        // Create account
        await createAccount({
          email,
          password,
          firstName,
          lastName
        });
        
        toast({
          title: "Account created",
          description: "You will be redirected to complete your profile.",
        });
      } else {
        // Login flow
        await initiateProviderContact({
          email,
          providerId: provider.id
        });
        
        toast({
          title: "Sign-in link sent",
          description: "Please check your email to continue.",
        });
      }
      
      // Redirect to online-therapy.com with proper parameters
      setTimeout(() => {
        window.location.href = `https://online-therapy.com/connect?provider=${provider.id}&email=${encodeURIComponent(email)}`;
      }, 1500);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connect with {provider.name}</DialogTitle>
          <DialogDescription className="text-center">
            Create an account or sign in to schedule a consultation with this provider.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/150?text=Provider";
            }}
          />
          <div>
            <h4 className="font-semibold">{provider.name}</h4>
            <p className="text-sm text-gray-600">{provider.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{provider.rating} ({provider.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="signup" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Create Account</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="signup" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and privacy policy
                </label>
              </div>
            </TabsContent>
            
            <TabsContent value="signin" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <p className="text-sm text-gray-600">
                We'll send you a link to sign in and connect with this provider.
              </p>
            </TabsContent>
            
            <div className="mt-6">
              <Button 
                type="submit"
                className="w-full bg-mindful-600 hover:bg-mindful-700"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Continue to online-therapy.com
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-center mt-4 text-gray-500">
              By continuing, you'll be taken to online-therapy.com to complete your account setup and consultation booking.
            </p>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectProviderModal;
