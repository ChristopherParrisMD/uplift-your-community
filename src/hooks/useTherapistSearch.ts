
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/constants/therapistSearch";

interface Therapist {
  id: string;
  name: string;
  image: string; // Added this to ensure consistency
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  coordinates: [number, number];
  [key: string]: any;
}

interface UseTherapistSearchProps {
  defaultMapCenter?: [number, number];
}

export const useTherapistSearch = ({ defaultMapCenter = [42.3314, -83.0458] }: UseTherapistSearchProps = {}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultMapCenter);

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
    setTherapists([]);

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
    } catch (err: any) {
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

  const toggleMapView = () => setShowMap(!showMap);
  const setLocationAndSearch = (location: string) => {
    setSearchLocation(location);
    setSuggestions([]);
    handleSearch();
  };

  return {
    searchLocation,
    specialty,
    insurance,
    sortBy,
    therapists,
    loading,
    error,
    suggestions,
    showMap,
    mapCenter,
    setSpecialty,
    setInsurance,
    setSortBy,
    handleLocationChange,
    handleSearch,
    toggleMapView,
    setLocationAndSearch
  };
};

export default useTherapistSearch;
