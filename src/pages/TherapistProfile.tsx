
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, MapPin, Phone, Mail, Clock, DollarSign, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import 'leaflet/dist/leaflet.css';

interface Therapist {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  location: string;
  distance: string;
  availability: string;
  rating: number;
  reviews: number;
  image: string;
  insurance: string[];
  approaches: string[];
  acceptingNew: boolean;
  price: number;
  languages: string[];
  nextAvailable: string;
  coordinates: [number, number];
  phone: string;
  email: string;
  gender: string;
  practiceAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const TherapistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/therapists/${id}`);
        
        if (!response.ok) {
          throw new Error("Therapist not found");
        }
        
        const data = await response.json();
        setTherapist(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching therapist:", err);
        setError("Could not load therapist profile. Please try again later.");
        setLoading(false);
        toast({
          title: "Error",
          description: "Could not load therapist profile. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    fetchTherapist();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-mindful-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading therapist profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !therapist) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Therapist Not Found</h2>
            <p className="mt-4 text-gray-600">We couldn't find the therapist you're looking for.</p>
            <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => window.history.back()}
            >
              &larr; Back to Search Results
            </Button>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 lg:w-1/4">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name} 
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
                
                <div className="p-6 md:p-8 md:w-2/3 lg:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{therapist.name}</h1>
                      <p className="text-gray-600">{therapist.credentials}</p>
                      <p className="text-lg font-medium mt-1 text-mindful-800">{therapist.specialty}</p>
                    </div>
                    
                    <div className="flex items-center bg-mindful-50 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span className="font-medium">{therapist.rating}</span>
                      <span className="ml-1 text-gray-500">({therapist.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-5 w-5 mr-2 text-mindful-600" />
                          <div>
                            <p>{therapist.practiceAddress.street}</p>
                            <p>{therapist.practiceAddress.city}, {therapist.practiceAddress.state} {therapist.practiceAddress.zip}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <Phone className="h-5 w-5 mr-2 text-mindful-600" />
                          <p>{therapist.phone}</p>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <Mail className="h-5 w-5 mr-2 text-mindful-600" />
                          <p>{therapist.email}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Availability</h3>
                      
                      <div className="flex items-center text-gray-700 mb-2">
                        <Clock className="h-5 w-5 mr-2 text-mindful-600" />
                        <p>Next available: {therapist.nextAvailable}</p>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="h-5 w-5 mr-2 text-mindful-600" />
                        <p>Session fee: ${therapist.price}</p>
                      </div>
                      
                      {therapist.acceptingNew && (
                        <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          Currently accepting new clients
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Accepted Insurance</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {therapist.insurance.map((ins, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {ins}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Treatment Approaches</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {therapist.approaches.map((approach, idx) => (
                          <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                            {approach}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {therapist.languages.map((lang, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="bg-mindful-600 hover:bg-mindful-700 mr-4">
                      Book Appointment
                    </Button>
                    <Button variant="outline">
                      Contact Provider
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="h-[300px] rounded-lg overflow-hidden border">
                  <MapContainer
                    center={therapist.coordinates}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={therapist.coordinates}>
                      <Popup>
                        <div>
                          <p className="font-bold">{therapist.name}</p>
                          <p className="text-sm">{therapist.practiceAddress.street}</p>
                          <p className="text-sm">{therapist.practiceAddress.city}, {therapist.practiceAddress.state} {therapist.practiceAddress.zip}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
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

export default TherapistProfile;
