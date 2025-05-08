
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, MapPin, Search, User } from "lucide-react";

// Mock therapist data
const mockTherapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    location: "San Francisco, CA",
    distance: "1.2 miles",
    availability: "Available this week",
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Blue Cross", "Aetna", "Kaiser"],
    approaches: ["CBT", "Mindfulness", "Psychodynamic"],
    acceptingNew: true
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Trauma & PTSD",
    location: "Oakland, CA",
    distance: "3.5 miles",
    availability: "Available next week",
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Medicare", "Blue Shield", "United"],
    approaches: ["EMDR", "Somatic Experiencing"],
    acceptingNew: true
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Relationship Issues",
    location: "Berkeley, CA",
    distance: "5.8 miles",
    availability: "Available in 2 weeks",
    rating: 4.7,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1574022648428-2932d9272841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Cigna", "Aetna", "Magellan"],
    approaches: ["Humanistic", "Family Systems"],
    acceptingNew: true
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Addiction & Recovery",
    location: "Palo Alto, CA",
    distance: "12.4 miles",
    availability: "Available this week",
    rating: 4.6,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1557231146-afde25e6598f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    insurance: ["Anthem", "Blue Shield", "Cigna"],
    approaches: ["Motivational Interviewing", "CBT", "12-Step"],
    acceptingNew: false
  },
];

const TherapistSearch = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  const [therapists, setTherapists] = useState(mockTherapists);

  // Simple filtering for demo purposes
  const handleSearch = () => {
    // In a real app, this would make an API call
    // For now, we'll just simulate filtering
    let filtered = [...mockTherapists];
    
    if (specialty) {
      filtered = filtered.filter(t => 
        t.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    if (insurance) {
      filtered = filtered.filter(t => 
        t.insurance.some(i => i.toLowerCase().includes(insurance.toLowerCase()))
      );
    }
    
    setTherapists(filtered);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Find a Mental Health Professional</h2>
      
      <Tabs defaultValue="location">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="location">Search by Location</TabsTrigger>
          <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your city or zip code"
                  className="pl-10"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="bg-mindful-600 hover:bg-mindful-700" 
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" /> Search Therapists
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="filters">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <Select 
                value={specialty} 
                onValueChange={setSpecialty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anxiety">Anxiety & Depression</SelectItem>
                  <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                  <SelectItem value="relationship">Relationship Issues</SelectItem>
                  <SelectItem value="addiction">Addiction & Recovery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
              <Select 
                value={insurance} 
                onValueChange={setInsurance}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue cross">Blue Cross</SelectItem>
                  <SelectItem value="aetna">Aetna</SelectItem>
                  <SelectItem value="cigna">Cigna</SelectItem>
                  <SelectItem value="medicare">Medicare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="bg-mindful-600 hover:bg-mindful-700 mt-auto" 
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Therapists near you</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapists.map((therapist) => (
            <Card key={therapist.id} className="card-hover overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={therapist.image} 
                      alt={therapist.name} 
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                  <div className="p-4 sm:p-6 sm:w-2/3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg">{therapist.name}</h4>
                      <div className="flex items-center bg-mindful-50 px-2 py-1 rounded-full text-xs text-mindful-800">
                        <span className="font-medium">★ {therapist.rating}</span>
                        <span className="ml-1 text-gray-500">({therapist.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{therapist.specialty}</p>
                    
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{therapist.location} • {therapist.distance}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {therapist.insurance.slice(0, 2).map((ins, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {ins}
                        </span>
                      ))}
                      {therapist.insurance.length > 2 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{therapist.insurance.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${therapist.acceptingNew ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {therapist.acceptingNew ? (
                          <span className="flex items-center">
                            <Check className="h-3 w-3 mr-1" /> 
                            Accepting new patients
                          </span>
                        ) : 'Limited availability'}
                      </span>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistSearch;
