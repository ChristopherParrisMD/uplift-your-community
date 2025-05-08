import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, MapPin, Search, User, Star, Clock, DollarSign, Map, Phone, Mail } from "lucide-react";
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

// Remove the mock data constants since we'll get them from the API
const API_URL = 'http://localhost:3001/api';

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
  const [therapists, setTherapists] = useState([]);
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

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      setError("Please enter a location to search");
      return;
    }

    setLoading(true);
    setError("");
    setTherapists([]); // Clear existing results

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchLocation.trim()) params.append('location', searchLocation.trim());
      if (specialty) params.append('specialty', specialty);
      if (insurance) params.append('insurance', insurance);
      if (sortBy) params.append('sortBy', sortBy);

      console.log('Searching with params:', params.toString());
      const response = await fetch(`${API_URL}/therapists?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch therapists');
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server');
      }
      
      if (data.length === 0) {
        setError("No therapists found matching your criteria. Try adjusting your search parameters.");
      } else {
        setTherapists(data);
        setShowMap(true);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "An error occurred while searching. Please try again.");
      setTherapists([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle location input changes
  const handleLocationChange = async (value: string) => {
    setSearchLocation(value);
    if (value.length > 2) {
      try {
        const response = await fetch(`${API_URL}/locations?query=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
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
                        handleSearch(); // Search when suggestion is selected
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
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Update the therapist card to show NPI information
const TherapistCard = ({ therapist }) => (
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
            <div>
              <h4 className="font-bold text-lg">{therapist.name}</h4>
              {therapist.credentials && (
                <span className="text-sm text-gray-600">{therapist.credentials}</span>
              )}
            </div>
            <div className="flex items-center bg-mindful-50 px-2 py-1 rounded-full text-xs text-mindful-800">
              <Star className="h-3 w-3 mr-1" />
              <span className="font-medium">{therapist.rating}</span>
              <span className="ml-1 text-gray-500">({therapist.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 mt-1">{therapist.specialty}</p>
          
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{therapist.location}</span>
          </div>

          {therapist.practiceAddress && (
            <div className="mt-2 text-sm text-gray-500">
              <p>{therapist.practiceAddress.street}</p>
              <p>{therapist.practiceAddress.city}, {therapist.practiceAddress.state} {therapist.practiceAddress.zip}</p>
            </div>
          )}

          {therapist.phone && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-1" />
              <span>{therapist.phone}</span>
            </div>
          )}

          {therapist.email && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1" />
              <span>{therapist.email}</span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {therapist.languages.map((lang, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {lang}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">NPI: {therapist.npi}</span>
              {therapist.gender && (
                <span className="text-xs text-gray-500">Gender: {therapist.gender}</span>
              )}
            </div>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TherapistSearch;
