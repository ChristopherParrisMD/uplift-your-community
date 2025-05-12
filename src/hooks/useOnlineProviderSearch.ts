
import { useState, useEffect } from "react";
import { searchProviders, getLocationSuggestions, OnlineTherapist } from "@/services/onlineTherapyService";
import { toast } from "@/components/ui/use-toast";

interface UseOnlineProviderSearchProps {
  defaultMapCenter?: [number, number];
}

export const useOnlineProviderSearch = ({ defaultMapCenter = [42.3314, -83.0458] }: UseOnlineProviderSearchProps = {}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [specialty, setSpecialty] = useState("any");
  const [insurance, setInsurance] = useState("any");
  const [sortBy, setSortBy] = useState("distance");
  const [providers, setProviders] = useState<OnlineTherapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultMapCenter);
  const [searchPerformed, setSearchPerformed] = useState(false);

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
        const suggestionsData = await getLocationSuggestions(value);
        setSuggestions(suggestionsData);
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
    setProviders([]);
    setSearchPerformed(true);

    try {
      console.log('Searching with params:', { 
        location: searchLocation,
        specialty,
        insurance,
        sortBy
      });
      
      const data = await searchProviders({
        location: searchLocation.trim(),
        specialty,
        insurance,
        sortBy
      });
      
      console.log('Search results:', data);
      
      if (data.length === 0) {
        setError("No providers found matching your criteria. Try adjusting your search parameters.");
        toast({
          title: "No Results",
          description: "No providers found matching your criteria. Try adjusting your search parameters.",
          variant: "destructive"
        });
      } else {
        setProviders(data);
        
        // Set map center to the first result's coordinates if available
        if (data[0]?.coordinates) {
          setMapCenter(data[0].coordinates);
        }
        
        toast({
          title: "Search Complete",
          description: `Found ${data.length} providers matching your criteria.`
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
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMapView = () => setShowMap(!showMap);
  
  const setLocationAndSearch = (location: string) => {
    setSearchLocation(location);
    setSuggestions([]);
    
    // Set the location first, then search in the next event loop
    setTimeout(() => {
      handleSearch();
    }, 0);
  };

  return {
    searchLocation,
    specialty,
    insurance,
    sortBy,
    providers,
    loading,
    error,
    suggestions,
    showMap,
    mapCenter,
    searchPerformed,
    setSpecialty,
    setInsurance,
    setSortBy,
    handleLocationChange,
    handleSearch,
    toggleMapView,
    setLocationAndSearch
  };
};

export default useOnlineProviderSearch;
