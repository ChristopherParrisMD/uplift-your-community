
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Map } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from "@/components/ui/use-toast";
import TherapistCard from "./therapist/TherapistCard";
import TherapistMap from "./therapist/TherapistMap";
import SearchFilters from "./therapist/SearchFilters";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const [mapCenter, setMapCenter] = useState<[number, number]>([42.3314, -83.0458]); // Default to Detroit

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
      toast({
        title: "Location Required",
        description: "Please enter a location to search",
        variant: "destructive"
      });
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
        toast({
          title: "No Results",
          description: "No therapists found matching your criteria. Try adjusting your search parameters.",
          variant: "destructive"
        });
      } else {
        setTherapists(data);
        
        // Set map center to the first result's coordinates if available
        if (data[0]?.coordinates) {
          setMapCenter(data[0].coordinates);
        }
        
        setShowMap(true);
        toast({
          title: "Search Complete",
          description: `Found ${data.length} therapists matching your criteria.`
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "An error occurred while searching. Please try again.");
      toast({
        title: "Search Error",
        description: err.message || "An error occurred while searching. Please try again.",
        variant: "destructive"
      });
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
          <SearchFilters 
            specialty={specialty}
            setSpecialty={setSpecialty}
            insurance={insurance}
            setInsurance={setInsurance}
            sortBy={sortBy}
            setSortBy={setSortBy}
            specialties={specialties}
            insuranceOptions={insuranceOptions}
            sortOptions={sortOptions}
          />

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
          <TherapistMap therapists={therapists} mapCenter={mapCenter} />
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

export default TherapistSearch;
