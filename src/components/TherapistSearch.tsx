
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SearchFilters from "./therapist/SearchFilters";
import LocationSearch from "./therapist/LocationSearch";
import SearchResults from "./therapist/SearchResults";
import { useTherapistSearch } from "@/hooks/useTherapistSearch";
import { specialties, insuranceOptions, sortOptions } from "@/constants/therapistSearch";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TherapistSearch = () => {
  const {
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
  } = useTherapistSearch();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Find a Mental Health Professional</h2>
      
      <Tabs defaultValue="location">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="location">Search by Location</TabsTrigger>
          <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4">
          <LocationSearch
            searchLocation={searchLocation}
            handleLocationChange={handleLocationChange}
            handleSearch={handleSearch}
            loading={loading}
            suggestions={suggestions}
            setLocationAndSearch={setLocationAndSearch}
          />
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

          <button 
            className="bg-mindful-600 hover:bg-mindful-700 text-white px-4 py-2 rounded-md flex items-center mt-6" 
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
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Apply Filters
              </>
            )}
          </button>
        </TabsContent>
      </Tabs>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <SearchResults 
        therapists={therapists}
        showMap={showMap}
        toggleMapView={toggleMapView}
        mapCenter={mapCenter}
        error={error}
      />
    </div>
  );
};

export default TherapistSearch;
