
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface LocationSearchProps {
  searchLocation: string;
  handleLocationChange: (value: string) => void;
  handleSearch: () => void;
  loading: boolean;
  suggestions: string[];
  setLocationAndSearch: (location: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  searchLocation,
  handleLocationChange,
  handleSearch,
  loading,
  suggestions,
  setLocationAndSearch
}) => {
  return (
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
                onClick={() => setLocationAndSearch(suggestion)}
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
  );
};

export default LocationSearch;
