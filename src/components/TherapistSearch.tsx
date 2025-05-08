import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, MapPin, Search, User, Star, Clock, DollarSign, Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock location suggestions
const locationSuggestions = [
  "San Francisco, CA",
  "Oakland, CA",
  "Berkeley, CA",
  "Palo Alto, CA",
  "San Jose, CA",
  "San Mateo, CA",
  "Redwood City, CA",
  "Mountain View, CA"
];

// Mock therapist data with coordinates
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
    acceptingNew: true,
    price: 150,
    languages: ["English", "Spanish"],
    nextAvailable: "2024-03-20",
    coordinates: [37.7749, -122.4194]
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
    acceptingNew: true,
    price: 175,
    languages: ["English", "Mandarin"],
    nextAvailable: "2024-03-25",
    coordinates: [37.8044, -122.2712]
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
    acceptingNew: true,
    price: 160,
    languages: ["English", "Spanish"],
    nextAvailable: "2024-03-28",
    coordinates: [37.8715, -122.2730]
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
    acceptingNew: false,
    price: 200,
    languages: ["English"],
    nextAvailable: "2024-04-01",
    coordinates: [37.4419, -122.1430]
  }
];

// Available specialties and insurance options
const specialties = [
  "Anxiety & Depression",
  "Trauma & PTSD",
  "Relationship Issues",
  "Addiction & Recovery",
  "Eating Disorders",
  "ADHD",
  "LGBTQ+ Support",
  "Grief & Loss",
  "Family Therapy",
  "Career Counseling"
];

const insuranceOptions = [
  "Blue Cross",
  "Aetna",
  "Cigna",
  "Medicare",
  "Blue Shield",
  "United",
  "Kaiser",
  "Anthem",
  "Magellan"
];

const sortOptions = [
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Rating" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "availability", label: "Next Available" }
];

const TherapistSearch = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [therapists, setTherapists] = useState(mockTherapists);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7749, -122.4194]); // Default to SF

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Handle location input changes
  const handleLocationChange = (value: string) => {
    setSearchLocation(value);
    if (value.length > 2) {
      const filtered = locationSuggestions.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setError("");

    try {
      let filtered = [...mockTherapists];
      
      if (searchLocation) {
        filtered = filtered.filter(t => 
          t.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }
      
      if (specialty) {
        filtered = filtered.filter(t => 
          t.specialty.toLowerCase() === specialty.toLowerCase()
        );
      }
      
      if (insurance) {
        filtered = filtered.filter(t => 
          t.insurance.some(i => i.toLowerCase() === insurance.toLowerCase())
        );
      }

      // Sort results
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "distance":
            return parseFloat(a.distance) - parseFloat(b.distance);
          case "rating":
            return b.rating - a.rating;
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "availability":
            return new Date(a.nextAvailable).getTime() - new Date(b.nextAvailable).getTime();
          default:
            return 0;
        }
      });
      
      setTherapists(filtered);
      setShowMap(true);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
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
            <div className="flex-1 relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your city or zip code"
                  className="pl-10"
                  value={searchLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchLocation(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button 
              className="bg-mindful-600 hover:bg-mindful-700" 
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" /> Search Therapists
                </>
              )}
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
                  {specialties.map((spec) => (
                    <SelectItem key={spec} value={spec.toLowerCase()}>
                      {spec}
                    </SelectItem>
                  ))}
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
                  {insuranceOptions.map((ins) => (
                    <SelectItem key={ins} value={ins.toLowerCase()}>
                      {ins}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="bg-mindful-600 hover:bg-mindful-700" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Apply Filters
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Therapists near you</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{therapists.length} results found</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2"
            >
              <Map className="h-4 w-4" />
              {showMap ? "Show List" : "Show Map"}
            </Button>
          </div>
        </div>
        
        {therapists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No therapists found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search in a different location.</p>
          </div>
        ) : showMap ? (
          <div className="h-[600px] rounded-lg overflow-hidden border">
            <MapContainer
              center={mapCenter}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {therapists.map((therapist) => (
                <Marker
                  key={therapist.id}
                  position={therapist.coordinates as [number, number]}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold">{therapist.name}</h4>
                      <p className="text-sm text-gray-600">{therapist.specialty}</p>
                      <p className="text-sm text-gray-500">{therapist.location}</p>
                      <div className="mt-2 flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{therapist.rating} ({therapist.reviews} reviews)</span>
                      </div>
                      <Button
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => setShowMap(false)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : (
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
                          <Star className="h-3 w-3 mr-1" />
                          <span className="font-medium">{therapist.rating}</span>
                          <span className="ml-1 text-gray-500">({therapist.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-1">{therapist.specialty}</p>
                      
                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{therapist.location} • {therapist.distance}</span>
                      </div>

                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Next available: {new Date(therapist.nextAvailable).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>${therapist.price}/session</span>
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
        )}
      </div>
    </div>
  );
};

export default TherapistSearch;
