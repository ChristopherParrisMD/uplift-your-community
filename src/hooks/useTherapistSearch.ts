
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { searchProviders, getLocationSuggestions, Provider } from "@/services/providerService";

interface UseTherapistSearchProps {
  defaultMapCenter?: [number, number];
}

export const useTherapistSearch = ({ defaultMapCenter = [42.3314, -83.0458] }: UseTherapistSearchProps = {}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [therapists, setTherapists] = useState<Provider[]>([]);
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
        const suggestions = await getLocationSuggestions(value);
        setSuggestions(suggestions);
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
      const results = await searchProviders({
        location: searchLocation.trim(),
        specialty: specialty || undefined,
        insurance: insurance || undefined,
        sortBy: sortBy || undefined,
      });
      
      if (results.length === 0) {
        setError("No providers found matching your criteria. Try adjusting your search parameters.");
        toast({
          title: "No Results",
          description: "No providers found matching your criteria. Try adjusting your search parameters.",
          variant: "destructive"
        });
      } else {
        setTherapists(results);
        
        // Set map center to the first result's coordinates if available
        if (results[0]?.coordinates) {
          setMapCenter(results[0].coordinates);
        }
        
        setShowMap(false); // Start with list view
        toast({
          title: "Search Complete",
          description: `Found ${results.length} providers matching your criteria.`
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
    setTimeout(() => {
      handleSearch();
    }, 100);
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
